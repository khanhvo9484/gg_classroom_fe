import axios from "axios";

export const customAxios = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function createAxiosResponseInterceptor() {
  const interceptor = customAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Reject promise if usual error
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }
      if (localStorage.getItem("access_token") === null) {
        window.location.href = `/sign-in?redirect=${window.location.pathname}`;
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response.
       *
       * Must be re-attached later on or the token refresh will only happen once
       */
      customAxios.interceptors.response.eject(interceptor);

      return customAxios
        .post("/api/v1/auth/refresh-token/refresh")
        .then((response) => {
          saveToken(response.data.access_token as string);
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          // Retry the initial call, but with the updated token in the headers.
          // Resolves the promise if successful
          return customAxios(error.response.config);
        })
        .catch((error2) => {
          // Retry failed, clean up and reject the promise
          destroyToken();
          window.location.href = `/sign-in?redirect=${window.location.pathname}`;
          return Promise.reject(error2);
        })
        .finally(createAxiosResponseInterceptor); // Re-attach the interceptor by running the method
    }
  );
}

createAxiosResponseInterceptor();

function saveToken(accessToken: string) {
  localStorage.setItem("access_token", accessToken);
}
function destroyToken() {
  localStorage.removeItem("access_token");
}
