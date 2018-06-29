
const option = require("./webpack.base");
const path = require("path");
option.devServer = {
    contentBase: path.resolve(__dirname, "../dist/pages"),
    host: "localhost",
    compress: true,
    port: 8888,
}
option.mode = "development"

module.exports = option;



























