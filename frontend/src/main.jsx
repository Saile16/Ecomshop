import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./index.css";
import "./bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PayPalScriptProvider
    options={{
      "client-id":
        "AfAq6-vbu_A5Z59iTqNGVn9EuSuFuA4n1hout5Hk-eMi0y27JGrJuboHcT6g2wAuOzIRzxhSH1yViKIg",
    }}
  >
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </PayPalScriptProvider>
);
