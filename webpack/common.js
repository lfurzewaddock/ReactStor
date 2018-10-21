"use strict";

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTemplate = require("html-webpack-template");
const path = require("path");

module.exports = {
  entry: {
    storeFront: "./src/ui/store-front",
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "../src")],
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          emitWarning: true,
          emitError: true,
          failOnWarning: true,
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "../src")],
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../"),
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      title: "ReactStor store front",
      meta: [{
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no",
      }],
      appMountId: "root",
      appMountHtmlSnippet: "<noscript>You need to enable JavaScript to run this app.</noscript>",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
};
