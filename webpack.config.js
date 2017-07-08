const path = require("path");
const fs = require("fs");

const webpack = require("webpack");

const babelConfig = JSON.parse(fs.readFileSync(".babelrc"));

module.exports = (env = { dev: false }) => {
  const plugins = [];
  if (env.dev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    );
  } else {
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  }

  return {
    entry: path.resolve("src", "index.js"),
    output: {
      filename: "bundle.js",
      path: path.resolve("public", "assets"),
      publicPath: "/assets/"
    },
    module: {
      rules: [
        {
          test: /\.(html|js)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: babelConfig
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: "svelte-loader"
        }
      ]
    },
    devtool: "inline-source-map",
    devServer: {
      contentBase: path.resolve("public"),
      compress: true,
      port: 3000,
      hotOnly: true,
      clientLogLevel: "error",
      historyApiFallback: true
    },
    plugins
  };
};
