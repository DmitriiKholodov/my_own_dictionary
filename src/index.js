import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import "./styles.css";

const bookmarks = [];
const rootElement = document.getElementById("root");
ReactDOM.render(<App bookmarks={bookmarks}/>, rootElement);
