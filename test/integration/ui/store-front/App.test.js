// import "jsdom-global/register";
import test from "tape";
import React from "react";
import ReactDOM from "react-dom";

import App from "../../../../src/ui/store-front/App";

test("App.js", (t) => {
  t.test("renders", (assert) => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);

    assert.pass("without crashing");
    assert.end();
  });
});
