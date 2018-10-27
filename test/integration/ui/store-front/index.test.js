// import "jsdom-global/register";
import test from "tape";
import React from "react";
import ReactDOM from "react-dom";

import "../../../enzyme-setup";

import Routes from "../../../../src/ui/store-front/routes";

const routes = <Routes />;

test("store-front/index.js", (t) => {
  t.test("App renders", (assert) => {
    const div = document.createElement("div");

    ReactDOM.render(routes, div);
    ReactDOM.unmountComponentAtNode(div);

    assert.pass("without crashing");
    assert.end();
  });
});
