const globby = require("globby");
const path = require("path");
function getEntry(basedir = "../src/pages/", type = "html") {
    return globby.sync(basedir, {
        expandDirectories: {

            files: [`*.${type}`]
        },
      
    })

}
module.exports = getEntry()












