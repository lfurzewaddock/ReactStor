"use strict";

const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

const config = require("./common");
const vars = require("./vars");

// START Source: Create React App
// https://github.com/facebook/create-react-app/packages/react-scripts/config/webpack.config.prod.js

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = "./";
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === "./";
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: Object.assign(
        {},
        shouldUseRelativeAssetPaths ? { publicPath: "../../" } : undefined,
      ),
    },
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
        sourceMap: shouldUseSourceMap,
      },
    },
  ];
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: shouldUseSourceMap,
      },
    });
  }
  return loaders;
};
// END Source: Create React App

module.exports = merge(config, {
  devtool: "source-map",
  module: {
    rules: [
      // START Source: Create React App
      // https://github.com/facebook/create-react-app/packages/react-scripts/config/webpack.config.prod.js

      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works just like "file" loader but it also embeds
          // assets smaller than specified size as data URLs to avoid requests.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          // START Source: Create React App
          // https://github.com/facebook/create-react-app/packages/react-scripts/config/webpack.config.prod.js
          // Custom - Support camelCase in CSS loader

          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // `MiniCSSExtractPlugin` extracts styles into CSS
          // files. If you use code splitting,
          // async bundles will have their own separate CSS chunk file.
          // By default we support CSS Modules with the extension .module.css
          {
            test: vars.cssRegex,
            exclude: vars.cssModuleRegex,
            loader: getStyleLoaders({
              importLoaders: 1,
              camelCase: true,
              sourceMap: shouldUseSourceMap,
            }),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: vars.cssModuleRegex,
            loader: getStyleLoaders({
              importLoaders: 1,
              sourceMap: shouldUseSourceMap,
              modules: true,
              camelCase: true,
              getLocalIdent: getCSSModuleLocalIdent,
            }),
          },
          // Opt-in support for SASS. The logic here is somewhat similar
          // as in the CSS routine, except that "sass-loader" runs first
          // to compile SASS files into CSS.
          // By default we support SASS Modules with the
          // extensions .module.scss or .module.sass
          {
            test: vars.sassRegex,
            exclude: vars.sassModuleRegex,
            loader: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: shouldUseSourceMap,
              },
              "sass-loader",
            ),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass
          {
            test: vars.sassModuleRegex,
            loader: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: shouldUseSourceMap,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              "sass-loader",
            ),
          },
          // END Source: Create React App

          // // "file" loader makes sure assets end up in the `build` folder.
          // // When you `import` an asset, you get its filename.
          // // This loader doesn't use a "test" so it will catch all modules
          // // that fall through the other loaders.
          // {
          //   loader: require.resolve("file-loader"),
          //   // Exclude `js` files to keep "css" loader working as it injects
          //   // it's runtime that would otherwise be processed through "file" loader.
          //   // Also exclude `html` and `json` extensions so they get processed
          //   // by webpacks internal loaders.
          //   exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          //   options: {
          //     name: "static/media/[name].[hash:8].[ext]",
          //   },
          // },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    // END Source: Create React App
    ],
  },
  plugins: [
    // START Source: Create React App
    // https://github.com/facebook/create-react-app/packages/react-scripts/config/webpack.config.prod.js
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    // END Source: Create React App
  ],
  output: {
    publicPath: "/", // server support React Router v4: https://tylermcginnis.com/react-router-cannot-get-url-refresh/
  },
});
