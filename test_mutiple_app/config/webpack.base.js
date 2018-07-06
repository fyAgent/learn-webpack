const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const { getEntry } = require("./utils.js");
const baseDir = path.resolve(__dirname, "../src/pages/");//源页面存储目录
const htmlPluginArr = [];//生成多页面htmlwebpackplugin配置
const entry = {};//生成多入口配置

getEntry(baseDir, "html").map(e => {
    const filename = e.dirname === "pages" ? e.base : e.dirname + "/" + e.base
    htmlPluginArr.push(new HtmlPlugin({
        chunks: [e.name],
        template: e.dir + "/" + e.base,
        filename: process.env.NODE_ENV === 'development' ? filename : "../../pages/" + filename,
        minify: false,
    }));
});
getEntry(baseDir, "js").map(e => {
    entry[e.name] = e.dir + "/" + e.base;
});
module.exports = {
    entry,
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
                    {
                        loader: 'postcss-loader',
                    },
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },

                    {
                        loader: 'postcss-loader',
                    },
                    { loader: "sass-loader" },
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            useRelativePath: false,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        /*打包之前清空dist文件夹*/
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../"),
            verbose: false,
            dry: false
        }),
        /*移动静态资源*/
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "../static/"),
                to: path.resolve(__dirname, "../dist/static"),
                toType: 'dir'
            }
        ]),
        /*抽离css*/
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: process.env.NODE_ENV == "development" ? "[name].css" : "../css/[name].css",
            chunkFilename: "[id].css"
        }),
        /*热加载*/
        new webpack.HotModuleReplacementPlugin(),
        /*多页面模板*/
        ...htmlPluginArr,
        
    ],
}

















