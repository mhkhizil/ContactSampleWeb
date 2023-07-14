import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StateContextProvider from "./Services/Context/Context.jsx";
import { Provider } from "react-redux";
import { store } from "./Services/store/store.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <StateContextProvider>
      <Provider store={store}>

      <App />
      </Provider>

    </StateContextProvider>
    </BrowserRouter>
    <ToastContainer/>
  </React.StrictMode>
);
