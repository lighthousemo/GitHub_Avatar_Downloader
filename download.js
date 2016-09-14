const request = require('request');
const fs = require("fs");

module.exports = {
  download: function(url, filePath) {
    request.get(url).on('err', function(err) {
      console.log(err);
    })
    .pipe(fs.createWriteStream(filePath))
    console.log(filePath);
  }
}