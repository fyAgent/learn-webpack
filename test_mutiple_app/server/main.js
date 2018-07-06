const Koa = require('koa');
const static = require('koa-static');
const path=require("path")
const app = new Koa();
app.use(static(path.resolve(__dirname,"../dist/")));
app.listen(3000)