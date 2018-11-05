import React from "react";
import ReactDOM from "react-dom";

import "sanitize.css";
import "./index.css";

import Routes from "./routes";

const routes = <Routes />;

ReactDOM.render(routes, document.getElementById("root") || document.createElement("div"));
