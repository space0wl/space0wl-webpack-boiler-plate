import express from "express";
import path from "path";

const server = express();

const webpack = require("webpack");
const webpackConfig = require("../../config/webpack.dev.js");
const webpackCompiler = webpack(webpackConfig);

/*
webpack-mild-compile is used to combat issue #25 where webpack compiles watched files multiple times. see: https://github.com/webpack/watchpack/issues/25
*/
// require("webpack-mild-compile")(webpackCompiler); 

 // Webpack middleware will build application as normal to the dist folder.
const webpackDevMiddleware = require("webpack-dev-middleware")(webpackCompiler, webpackConfig.devServer);

/*
Without the hot reloading middleware, the developer must manually refresh the page after webpack runs to see changes.
This will allow us to behave like the hot reloading in webpack-dev-server.
*/
const webpackHotMiddleware = require("webpack-hot-middleware")(webpackCompiler, webpackConfig.devServer);

// Create server middleware to serve application from the dist folder.
const staticMiddleware = express.static("dist"); 

// As usual, the order in which the middleware is run is important. First webpack, then hot-reloader, then express static.
server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(staticMiddleware);

// Finally start the server and listen on the specified port.
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});