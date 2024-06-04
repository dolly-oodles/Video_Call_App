import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals.js";
import { store } from "./Redux/store.js";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./ContextAPIs/AuthContext.jsx";
import { SocketContextProvider } from "./ContextAPIs/SocketContext.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthContextProvider>
      <SocketContextProvider>
        <ToastContainer />
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </Provider>
);

reportWebVitals();
//  position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//           transition={Bounce}
