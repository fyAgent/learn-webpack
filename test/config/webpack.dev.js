const path = require("path");
const uglify = require("uglifyjs-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "../src/main.js"),
        main2: path.resolve(__dirname, "../src/main2.js")
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },


                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: "sass-loader" },
                ],
                exclude: "/node_modules/"
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 5000
                        }
                    }
                ]
            }
        ]
    },
    plugins: [

        new uglify(),
        new HtmlPlugin({
            minify: {
                removeAttributeQuotes: true,

            },
            hash: true,
            template: path.resolve(__dirname, "../index.html")
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        host: "localhost",
        compress: true,
        port: 8888,
    }
}
