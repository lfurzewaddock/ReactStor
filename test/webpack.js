// Dynamic Loading
// https://survivejs.com/webpack/techniques/dynamic-loading/
// https://webpack.js.org/guides/dependency-management/#require-context
const context = require.context("./", true, /test.js$/);
context.keys().forEach(context);
module.exports = context;
