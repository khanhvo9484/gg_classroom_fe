import axios from "axios";

export const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
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
        window.location.href = `/login?redirect=${window.location.pathname}`;
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
        .post("/auth/refresh-token/refresh", {
          refresh_token: localStorage.getItem("refresh_token"),
        })
        .then((response) => {
          console.log(response.data.data);
          saveToken(
            response.data.data.access_token as string,
            response.data.data.refresh_token as string
          );
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.data.access_token;
          // Retry the initial call, but with the updated token in the headers.
          // Resolves the promise if successful
          return customAxios(error.response.config);
        })
        .catch((error2) => {
          // Retry failed, clean up and reject the promise
          destroyToken();
          window.location.href = `/login?redirect=${window.location.pathname}`;
          return Promise.reject(error2);
        })
        .finally(createAxiosResponseInterceptor); // Re-attach the interceptor by running the method
    }
  );
}

createAxiosResponseInterceptor();

function saveToken(accessToken: string, refreshToken: string) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}
function destroyToken() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
