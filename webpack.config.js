const fs = require("fs");
const webpack = require("webpack");
const BabiliPlugin = require("babili-webpack-plugin");

const serverConfig = require("./webpack/server.config");
const clientConfig = require("./webpack/client.config");

const babelConfig = JSON.parse(fs.readFileSync(".babelrc", "utf-8"));

module.exports = (env = { dev: false, server: false }) => {
  const base = {
    resolve: {
      extensions: [".js", ".html"]
    },
    module: {
      rules: [
        {
          test: /\.(html|js)$/,
          enforce: "pre",
          exclude: /node_modules/,
          loader: "eslint-loader"
        },
        {
          test: /\.(html|js)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: babelConfig
        }
      ]
    },
    devtool: env.dev ? "eval" : false,
    bail: !env.dev,
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.dev ? "development" : "production")
      })
    ].concat(env.dev ? [] : [new webpack.optimize.ModuleConcatenationPlugin(), new BabiliPlugin()])
  };

  return env.server ? serverConfig(env, base) : clientConfig(env, base);
};
