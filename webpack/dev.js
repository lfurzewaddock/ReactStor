"use strict";

const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

const config = require("./common");
const vars = require("./vars");

// START Source: Create React App
// https://github.com/facebook/create-react-app/packages/react-scripts/config/webpack.config.dev.js

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve("style-loader"),
    {
      loader: require.resolve("css-loader"),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve("postcss-loader"),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"), /* eslint-disable-line global-require */
          require("postcss-preset-env")({ /* eslint-disable-line global-require */
            autoprefixer: {
              flexbox: "no-2009",
            },
            stage: 3,
          }),
        ],
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};
// END Source: Create React App

module.exports = merge(config, {
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "../dist"),
    historyApiFallback: true, // server support React Router v4: https://tylermcginnis.com/react-router-cannot-get-url-refresh/
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  module: {
    rules: [
      // START Source: Create React App
      // https://github.com/facebook/create-react-app/packages/react-scripts/config/webpack.config.dev.js
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          // END Source: Create React App

          // START Source: Create React App
          // https://github.com/facebook/create-react-app/packages/react-scripts/config/webpack.config.dev.js
          // Custom - Support camelCase in CSS loader

          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          // By default we support CSS Modules with the extension .module.css
          {
            test: vars.cssRegex,
            exclude: vars.cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              camelCase: true,
            }),
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: vars.cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              modules: true,
              camelCase: true,
              getLocalIdent: getCSSModuleLocalIdent,
            }),
          },
          // Opt-in support for SASS (using .scss or .sass extensions).
          // Chains the sass-loader with the css-loader and the style-loader
          // to immediately apply all styles to the DOM.
          // By default we support SASS Modules with the
          // extensions .module.scss or .module.sass
          {
            test: vars.sassRegex,
            exclude: vars.sassModuleRegex,
            use: getStyleLoaders({ importLoaders: 2 }, "sass-loader"),
          },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass
          {
            test: vars.sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              "sass-loader",
            ),
          },
          // END Source: Create React App
        ],
      },
    // ** STOP ** Are you adding a new loader?
    // Make sure to add the new loader(s) before the "file" loader.
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    publicPath: "/", // server support React Router v4: https://tylermcginnis.com/react-router-cannot-get-url-refresh/
  },
});
