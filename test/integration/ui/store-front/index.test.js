// import "jsdom-global/register";
import test from "tape";
import React from "react";
import { mount } from "enzyme";

import "../../../enzyme-setup";

import index from "../../../../src/ui/store-front/index";

test("index.js", (t) => {
  t.test("mount", (assert) => {
    // TODO: Is this pointless? - delete if proved unnecessary

    // var root = global.document.createElement("div");
    // root.setAttribute("id", "root");
    // global.document.body.appendChild(root);
    // console.log("body: ", global.document.body.innerHTML);

    const wrapper = mount(<index />);

    const message = "should render an index component'";
    const actual = wrapper.contains(<index />);
    // const actual = wrapper.html();
    const expected = true;

    assert.equal(actual, expected, message);
    assert.end();
  });
});
