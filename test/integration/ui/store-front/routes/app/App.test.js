import test from "tape";
import td from "testdouble";
import { mount } from "enzyme";
import React from "react";
import { MemoryRouter as Router } from "react-router-dom";

import "../../../../../enzyme-setup";

import Layout from "../../../../../../src/ui/store-front/common/layout/containers/Layout";
import Home from "../../../../../../src/ui/store-front/routes/home/components/Home";
import Categories from "../../../../../../src/ui/store-front/routes/categories/components/Categories";

function setup() {
  const subject = require("../../../../../../src/ui/store-front/routes/app/components/App"); // eslint-disable-line global-require

  return {
    subject,
  };
}

function teardown(fixtures, wrapper) { // eslint-disable-line no-unused-vars
  wrapper.unmount();
  td.reset();
  // Assign reference to null for GC
  fixtures = null; // eslint-disable-line no-param-reassign
}

function getMatchPath(wrapper, node) {
  if (wrapper.find(node).length > 0) {
    return wrapper.find(node).prop("match").path;
  }
  return "";
}

test("store-front/routes/app/App.js", (t) => {
  t.test("Layout", (assert) => {
    const fixtures = setup();
    const node = Layout;
    const path = "";
    const wrapper = mount(
      <Router initialEntries={[path]}>
        <fixtures.subject />
      </Router>,
    );

    const message = `should render '${node.name}' component for empty path: ${path}`;
    const actual = wrapper.find(node).exists();
    const expected = true;

    assert.equal(actual, expected, message);
    teardown(fixtures, wrapper);
    assert.end();
  });
  t.test("Layout", (assert) => {
    const fixtures = setup();
    const node = Layout;
    const path = "/random";
    const wrapper = mount(
      <Router initialEntries={[path]}>
        <fixtures.subject />
      </Router>,
    );

    const message = `should render '${node.name}' component for path: ${path}`;
    const actual = wrapper.find(node).exists();
    const expected = true;

    assert.equal(actual, expected, message);
    teardown(fixtures, wrapper);
    assert.end();
  });
  t.test("Root path", (assert) => {
    const fixtures = setup();
    const node = Layout;
    const path = "/";
    const wrapper = mount(
      <Router initialEntries={[path]}>
        <fixtures.subject />
      </Router>,
    );

    const message = `should render route '${node.name}' component for path: ${path}`;
    const actual = wrapper.find(node).exists();
    const expected = true;

    assert.equal(actual, expected, message);
    teardown(fixtures, wrapper);
    assert.end();
  });
  t.test("Root path", (assert) => {
    const fixtures = setup();
    const node = Home;
    const path = "/";
    const wrapper = mount(
      <Router initialEntries={[path]}>
        <fixtures.subject />
      </Router>,
    );

    const message = `should render route '${node.name}' component for path: ${path}`;
    const actual = getMatchPath(wrapper, node);
    const expected = path;

    assert.equal(actual, expected, message);
    teardown(fixtures, wrapper);
    assert.end();
  });
  t.test("Root path", (assert) => {
    const fixtures = setup();
    const node = Categories;
    const path = "/";
    const wrapper = mount(
      <Router initialEntries={[path]}>
        <fixtures.subject />
      </Router>,
    );

    const message = `should NOT render route '${node.name}' component for path: ${path}`;
    const actual = wrapper.find(node).exists();
    const expected = false;

    assert.equal(actual, expected, message);
    teardown(fixtures, wrapper);
    assert.end();
  });
  t.test("Categories path", (assert) => {
    const fixtures = setup();
    const node = Layout;
    const path = "/categories";
    const wrapper = mount(
      <Router initialEntries={[path]}>
        <fixtures.subject />
      </Router>,
    );

    const message = `should render route '${node.name}' component for path: ${path}`;
    const actual = wrapper.find(node).exists();
    const expected = true;

    assert.equal(actual, expected, message);
    teardown(fixtures, wrapper);
    assert.end();
  });
  t.test("Categories path", (assert) => {
    const fixtures = setup();
    const node = Categories;
    const path = "/categories";
    const wrapper = mount(
      <Router initialEntries={[path]}>
        <fixtures.subject />
      </Router>,
    );

    const message = `should render route '${node.name}' component for path: ${path}`;
    const actual = getMatchPath(wrapper, node);
    const expected = path;

    assert.equal(actual, expected, message);
    teardown(fixtures, wrapper);
    assert.end();
  });
  t.test("Categories path", (assert) => {
    const fixtures = setup();
    const node = Home;
    const path = "/categories";
    const wrapper = mount(
      <Router initialEntries={[path]}>
        <fixtures.subject />
      </Router>,
    );

    const message = `should NOT render route '${node.name}' component for path: ${path}`;
    const actual = wrapper.find(node).exists();
    const expected = false;

    assert.equal(actual, expected, message);
    teardown(fixtures, wrapper);
    assert.end();
  });
});
