import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { baselightTheme } from "./theme/default.theme.tsx";
import { ThemeProvider } from "@mui/material/styles";
import configureStore from "./store";
import App from "./router/App.tsx";
import "./index.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={configureStore}>
    <BrowserRouter>
      <ThemeProvider theme={baselightTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);