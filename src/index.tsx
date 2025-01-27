import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

// Application wrapper

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // TODO - Add error boundary
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);

reportWebVitals();
