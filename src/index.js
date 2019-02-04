import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import "./styles.css";

window.bookmarks = [];
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
