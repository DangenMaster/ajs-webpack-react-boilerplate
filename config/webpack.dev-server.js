const path = require("path");
const webpack = require("webpack");
const externals = require("./node-externals");
//const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  name: "server",
  mode: "development",
  target: "node",
  externals,
  entry: './src/server/render.js',
  output: {
    filename: "dev-server-bundle.js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "../build"),
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        { loader: "babel-loader" }
      ]
    },
    {
      test: /\.css$/,
      use: [
        { loader: "css-loader" }
      ]
    },
    {
      test: /\.(jpg|gif|png)$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "/images/[name].[ext]",
          emitFile: false
        }
      }]
    },
    {
      test: /\.md$/,
      use: [
        { loader: "markdown-with-front-matter-loader" }
      ]
    }]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.NamedModulesPlugin()
  ]
};