const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const baseDir = path.resolve(__dirname, "../src/pages/");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getEntry = require("./entry.config.js");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const htmlPluginArr = [];
const entry = {};

getEntry(baseDir, "html").map(e => {
    
    htmlPluginArr.push(new HtmlPlugin({
        chunks: [e.name],
        template:e.dir+"/"+e.base,
        filename:e.dirname+"/"+e.base,
        minify:false,
    }));
})

getEntry(baseDir, "js").map(e => {
    entry[e.name] = e.dir + "/" + e.base;
})

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, "../dist/pages/"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                 
                    {
                        loader: "html-loader",
                       
                        options: {
                            minimize: false,
                            useRelativePath: false,
                        }
                    },

                ]
            },
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
                            limit: 100000,
                            useRelativePath: false,
                            name: '[name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 打包之前清空dist文件夹
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../"),
            verbose: true,
            dry: false
        }),
        // 抽离css
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name]/[name][hash].css",
            chunkFilename: "[id].css"
        }),
        // 多页面模板
        ...htmlPluginArr
    ],
}

















