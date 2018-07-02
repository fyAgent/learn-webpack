
const option = require("./webpack.base");
const path = require("path");
option.devServer = {
    contentBase: path.resolve(__dirname, "../dist/pages/"),
    host: "localhost",
    compress: true,
    port: 3333,
}
option.mode = "development";

module.exports = option;



























