process.env.NODE_ENV = 'development';
const option = require("./webpack.base");
const path = require("path");
option.devServer = {
    contentBase: path.resolve(__dirname, "../dist/"),
    host: "127.0.0.1",
    port: 8080,
    hot:true,
    open:true,
    openPage: 'webpack-dev-server'
}
module.exports = option;



























