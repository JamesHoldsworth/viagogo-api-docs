let fs = require('fs');

console.log('Referencing description.md ...');

let filePath = 'dist/openapi/openapi.yaml';
fs.readFile(filePath, 'utf-8', function(err, data) {
    if (err) {
        throw err;
    }
 
    var newValue = data.replace(
        '  description: viagogo\'s v2 REST API',
        '  description:\n    $ref: ../custom-docs/description.md');

    fs.writeFile(filePath, newValue, 'utf-8', function(err, data) {
        if (err) {
            throw err;
        }
    })
})