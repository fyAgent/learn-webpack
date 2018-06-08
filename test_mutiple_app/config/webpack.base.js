const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const getEntry = require("./fsreader.js")

console.log(getEntry)
module.exports = {
    mode: "development",
    entry: getEntry,
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: "[name]/[name].js",
        publicPath: "/"
    },
    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, "../src/pages/index/index.html"),
            filename: "index/index.html",
            chunks: ["index"]
        }),
        new HtmlPlugin({
            template: path.resolve(__dirname, "../src/pages/buy/buy.html"),
            filename: "buy/buy.html",
            chunks: ["buy"]
        })
    ]

}


















