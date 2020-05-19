const webpack = require("webpack"); //引入webpack
const { resolve } = require("path");
const HtmpWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: resolve(__dirname, "src/main.js"),
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    host: "localhost",
    port: "8080",
    open: true, //自动拉起浏览器
    hot: true, //热加载
    contentBase: resolve(__dirname, "dist"),
    compress: true, //GZIP
  },
  plugins: [
    // html 打包插件
    new HtmpWebpackPlugin({
      title: "学习Vue",
      template: __dirname + "/public/index.html",
    }),
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),
  ],
};
