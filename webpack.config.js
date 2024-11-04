const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
    libraryTarget: "commonjs2",
    publicPath: "/",
  },
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".html", ".js", ".jsx", ".sass", ".jpg", ".png", ".gif", ".svg", ".css", ".json"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3001,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: "asset/resource",
      },
    ],
  },
};
