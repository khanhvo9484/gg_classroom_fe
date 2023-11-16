import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { baselightTheme } from "./theme/DefaultTheme.tsx";
import { ThemeProvider } from "@mui/material/styles";
import configureStore from "./store";
import App from "./router/App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={configureStore}>
    <BrowserRouter>
      <ThemeProvider theme={baselightTheme}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
