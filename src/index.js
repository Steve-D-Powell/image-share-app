import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import LoadingScreen from "./components/LoadingScreen";
import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox-pro";

function WrappedApp() {
  return (
    <SimpleReactLightbox>
      <LoadingScreen />
      <App />
    </SimpleReactLightbox>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
