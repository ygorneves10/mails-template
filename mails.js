var dir = require('node-dir');
var fs = require('fs')
var folder = "templates"

var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

deleteFolderRecursive(folder)

var header = fs.readFileSync('default/header.html').toString();
var footer = fs.readFileSync('default/footer.html').toString();

try {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder)
    }
} catch (err) {
    console.error(err)
}

dir.readFiles('mails',
    function (err, content, filename, next) {
        if (err) throw err;
        const fileContent = header + content + footer
        const newFilePath = './' + folder + "/" + filename.split("\\")[1]
        try {
            fs.appendFile(newFilePath, fileContent, err => {
                console.log(err)
            });
        } catch (e) {
            console.log("Cannot write file ", e);
        }
        next();
    },
    function (err, files) {
        if (err) throw err;
        console.log('finished reading files:', files); // get filepath 
    });