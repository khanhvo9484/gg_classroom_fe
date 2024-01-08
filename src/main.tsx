import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { baselightTheme } from "./theme/default.theme.tsx";
import { ThemeProvider } from "@mui/material/styles";
import store from "./store";
import App from "./router/App.tsx";
import "./index.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CookiesProvider } from "react-cookie";
import { LoadingProvider } from "./context/loading.contenxt.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <ThemeProvider theme={baselightTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <LoadingProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </LoadingProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
);
