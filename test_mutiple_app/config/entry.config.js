const globby = require("globby");
const path = require("path");
function getEntry(dir, ext) {
    return globby.sync(dir, {
        expandDirectories: {
            files: [`*.${ext}`]
        },
        
    }).map(e => {
        const dir =e.dir;
        let parseResult = path.parse(e);
        
        parseResult.dirname = /\/(\w+)$/.exec(parseResult.dir)[1]
       
        
        return parseResult;
    })
}


module.exports = getEntry;





