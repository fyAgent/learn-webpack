process.env.NODE_ENV = 'production';
const webpack = require("webpack");
const option = require("./webpack.base.js");
const path =require("path");



option.output = {
    
    path: path.resolve(__dirname, "../dist/assets/js/"),
    filename: "[name].[hash].js",
},
webpack(option, (err, status) => {

    if (err) throw err;

})





