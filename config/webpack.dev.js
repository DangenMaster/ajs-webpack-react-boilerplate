const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: ["./src/main.js"]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist",
    hot: true,
    overlay: true
  },
  devtool: "source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.ejs"
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        { loader: "babel-loader" }
      ],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [
        { loader: "style-loader" },
        { 
          loader: "css-loader",
          query: {
            modules: true,
            localIdentName: "[name]__[local]--[hash:base64:8]"
          }
        }
      ]
    },
    {
      test: /\.sass$/,
      use: [
        { loader: "style-loader" }, 
        { loader: "css-loader" },
        { loader: "postcss-loader" },
        { loader: "sass-loader" }
      ]
    },
    {
      test: /\.html$/,
      use: [
        { loader: "html-loader" }
      ]
    },
    {
      test: /\.(jpg|gif|png)$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "images/[name]-[hash:8].[ext]"
        }
      }]
    }]
  }
};