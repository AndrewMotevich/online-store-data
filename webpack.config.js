const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
  },
  module: {
  },
  resolve: {
    extensions: [".js"]
  },
  output: {
    publicPath: "/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  experiments: {
    topLevelAwait: true
  }
}