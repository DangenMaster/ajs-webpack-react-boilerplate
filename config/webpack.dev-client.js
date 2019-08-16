const path = require("path");
const webpack = require("webpack");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  name: "client",
  entry: {
    vendor: ["react", "react-dom"],
    main: [
      "react-hot-loader/patch",
      "@babel/runtime/regenerator",
      "webpack-hot-middleware/client?reload=true",
      "./src/main.js"
    ]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    stats: {
      colors: true
    }
  },
  devtool: "source-map",
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
      use: [MiniCSSExtractPlugin.loader, "css-loader"]
      /* use: [
        { loader: "style-loader" },
        { loader: "css-loader" }
      ] */
    },
    {
      test: /\.(jpg|gif|png)$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]"
          //name: "images/[name]-[hash:8].[ext]"
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
    new MiniCSSExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};