import test from "tape";
import React from "react";
import { shallow } from "enzyme";

import "../../../enzyme-setup";

import App from "../../../../src/ui/store-front/App";

test("App.js", (t) => {
  t.test("App", (assert) => {
    const wrapper = shallow(<App />);

    const message = "should render a div with class 'App'";
    const actual = wrapper.first("div").hasClass("App");
    const expected = true;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("App", (assert) => {
    const wrapper = shallow(<App />);

    const message = "should contain a h1 tag with text: 'Hello, World!'";
    const actual = wrapper.contains(<h1>Hello, World!</h1>);
    const expected = true;

    assert.equal(actual, expected, message);
    assert.end();
  });
});
