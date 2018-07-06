const globby = require("globby");
const path = require("path");
function getEntry(dir, ext) {
    return globby.sync(dir, {
        expandDirectories: {
            files: [`*.${ext}`]
        },
        
    }).map(e => {
        let parseResult = path.parse(e);
        
        parseResult.dirname = /\/(\w+)$/.exec(parseResult.dir)[1];
        return parseResult;
    })
}
exports.getEntry = getEntry;






