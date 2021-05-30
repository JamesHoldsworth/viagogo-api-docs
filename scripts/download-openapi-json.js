let https = require('https');
let fs = require('fs');

function download(filename, url) {
  let file = fs.createWriteStream(filename);
  let request = https.get(url, function(response) {
    response.pipe(file);
  });
}

let openapiJsonUrl = 'https://api.viagogo.net/v2/openapi.json';

console.log('Downloading ' + openapiJsonUrl + '...');
download('dist/openapi/openapi.json', openapiJsonUrl);