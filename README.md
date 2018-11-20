# ReactStor (WIP)

This is probably the most complicated 'Hello World' app in the world!

Work in progress...

## Features: 

- Core navigation UI (responsive)
  - Burger icon for smaller screens to hide/show vertical side bar menu.
  - Horizontal navigation menu bar for larger screens.
- Okta OIDC (implicit flow) client integration
  - Login
  - Logout
  - Register
  - Profile (very basic)

## Commands


| $ npm run ...              | Description:                                                            |
|-------------------------------------|-------------------------------------------------------------------------|
| `testBuildBrowser`        | Webpack builds `test` files in to the `dist` directory, suitable for a web browser.  Open `/dist/index.html` in a web browser to see test results in the dev tools console. |
| `testBuildNode`           | Webpack builds `test` files in to the `dist` directory, suitable for Node.  In the termimal run `node_modules/.bin/tape dist/jsdom.environment.js dist/app.bundle.js` to see test results. |
| `testNodeBundle`          | runs testBuildNode, before running tests, piping results to tap-spec CLI terminal reporter. |
| `test`                    | runs ES6+ Tape tests using esm (ES module loader), avoiding Babel, piping results to tap-spec CLI terminal reporter. |
| `testStart`               | Webpack Dev Server compiles `test` files, opening output in default web browser.  See test results in the web browser dev tools console. |
| `testem`                  | TDD UX: runs ES6+ Tape tests using esm (ES module loader), avoiding Babel, with fail/pass tally in the terminal and watches for changes. |
| `debug`                   | runs ES6+ Tape tests with inspector protocol configured to enable process debugging using esm (ES module loader), avoiding Babel. |
| `devBuild`                | Webpack builds `src` files in to the `dist` directory, configured for development, suitable to open in a web browser. |
| `devWatch`                | runs devBuild and watches for changes. |
| `devStart`                | Webpack Dev Server compiles `src` files, opening output in default web browser. |
| `prodBuild`               | Webpack builds `src` files in to the `dist` directory, configured for production, suitable to open in a web browser. |
| `lint`                    | ESLint lint files and reports issues (read only). |
| `lintFix`                 | ESLint lint files and attempts to fix issues automatically (write). |
| `coverage`                | sets Node env to dev, NYC instruments code by running ES6+ Tape tests using esm (ES module loader), avoiding Babel. |
| `coverReport`             | runs coverage command before NYC generates HTML report from instrumented code, opening report in default web browser. |


## Log

- Download/install [js-tdd-kit](https://github.com/lfurzewaddock/js-tdd-kit)
- UI/layout theme/design [Semantic UI React](https://react.semantic-ui.com/)
  - `semantic-ui-less` package required to generate CSS from Less source
  - Note: encountered several issues using `semantic-ui-less` which required manual workarounds;
    - Required modifications to `semantic-ui-less` font URLs where present required - see: [Request: please add 'css' Less 'Import Option' to font imports #55](https://github.com/Semantic-Org/Semantic-UI-LESS/issues/55)
      - e.g. `@import url(https://fonts.googleapis.com/css?family=Roboto);` to `@import (css) url(https://fonts.googleapis.com/css?family=Roboto);`
    - Modifications to `semantic-ui-less` directories required, i.e.; 
      - `semantic-ui-less/themes/material/elements/icon.variables` from `@fontPath  : '../../themes/material/assets/fonts';` to `@fontPath  : '../../material/assets/fonts';`
      - `semantic-ui-less/themes/basic/elements/icon.variables` from `@fontPath  : "../../themes/basic/assets/fonts";` to `@fontPath  : "../../basic/assets/fonts";`
      - `semantic-ui-less/themes/themes/github/elements/icon.variables` from `@fontPath: '../../themes/github/assets/fonts';` to `@fontPath: '../../github/assets/fonts';`
    - Missing Github and Material icon font formats required download to relevant directories.
  - `semantic-ui-less-module-loader` required for Webpack to transpile Less from `semantic-ui-less` -> CSS
  - `babel-plugin-semantic-ui-react-transform-imports` adds imports for relevant Less source files from `semantic-ui-less` required to support components imported from `semantic-ui-react`. Important: This will only import direct Less dependencies, e.g. to support icons in form fields it was necessary to import the Icon component from `semantic-ui-react` just to acquire the relevant supporting Less files, required by form fields indirectly to support icons.


## Conventions

- File Names : [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react#naming)
- Folder Structure [How to Organize React Files Before It’s Messed Up](https://engineering.opsgenie.com/how-to-organize-react-files-before-its-messed-up-c85387f691be?gi=9ede35dbc980)


## Assets

- [Dynamic Dummy Image Generator](https://dummyimage.com/300x300/fff/aaa)
- [Acme logos](http://acmelogos.com/)

## Services

- [Okta Developer](https://developer.okta.com/code/react/)
