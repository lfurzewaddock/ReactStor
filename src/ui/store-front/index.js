import React from "react";
import ReactDOM from "react-dom";

import Routes from "./routes";

import "sanitize.css";
import "./index.css";

const routes = <Routes />;

ReactDOM.render(routes, document.getElementById("root") || document.createElement("div"));
