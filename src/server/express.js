//import path from "path";
import express from "express";

const server = express();
const port = process.env.PORT || 8080;

const webpack = require("webpack");
const config = require("../../config/webpack.dev");
const compiler = webpack(config);
const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config.devServer
);
server.use(webpackDevMiddleware);

const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
server.use(webpackHotMiddleware)

const staticMiddleware = express.static("dist");
server.use(staticMiddleware);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});