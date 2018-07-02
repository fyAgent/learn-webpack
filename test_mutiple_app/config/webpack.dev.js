
const option = require("./webpack.base");
const path = require("path");
option.devServer = {
    contentBase:path.join(__dirname,"../dist/"),
    host: "localhost",
    port: 3333,
    open: true,
    openPage:"/index/index.html",
    hot:true,
    inline:true,
    after:app=>{
        console.log("---------------------")
        console.log(app)
        console.log("---------------------")
    }
}
option.mode = "development";

module.exports = option;



























