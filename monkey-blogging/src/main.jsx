import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "./App.jsx";
import "./styles/index.scss";
import { theme } from "./utils/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
                <ToastContainer></ToastContainer>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
