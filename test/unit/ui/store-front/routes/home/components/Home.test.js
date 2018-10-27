import test from "tape";
import React from "react";
import { shallow } from "enzyme";

import "../../../../../../enzyme-setup";

import Home from "../../../../../../../src/ui/store-front/routes/home/components/Home";

test("Home.js", (t) => {
  t.test("Home", (assert) => {
    const wrapper = shallow(<Home />);

    const message = "should render a div with class 'Home'";
    const actual = wrapper.first("div").hasClass("Home");
    const expected = true;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("Home", (assert) => {
    const wrapper = shallow(<Home />);

    const message = "should contain a h1 tag with text: 'Hello, World!'";
    const actual = wrapper.contains(<h1>Hello, World!</h1>);
    const expected = true;

    assert.equal(actual, expected, message);
    assert.end();
  });
});
