var dir = require('node-dir');
var fs = require('fs')
var folder = "templates"
var http = require('http');
const files = []

var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
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

dir.readFiles('mails', (err, content, filename, next) => {
    if (err) throw err;
    const fileContent = header + content + footer
    const newFilePath = './' + folder + "/" + filename.split("\\")[1]
    files.push(newFilePath)
    try {
        fs.appendFile(newFilePath, fileContent, err => {
            if (err) {
                console.log(err)
            }
        });
    } catch (e) {
        console.log("Cannot append file ", e);
    }
    next();
}, (err, files) => {
    if (err) throw err;

    http.createServer((req, res) => {
        fs.readFile("templates/" + req.url, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    }).listen(8080, () => {
        files.forEach(file => {
            console.log("Press CTRL + Click to open => http://localhost:8080/" + file.split("\\")[1])
        })
        console.log("")
        console.log("Press CTRL + C to stop")
    });
});