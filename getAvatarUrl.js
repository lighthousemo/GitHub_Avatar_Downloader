const request = require('request');
const fs = require("fs");
const download = require('./download.js')

module.exports = {
  get: function(body){
    fs.mkdir(folder,function(err) {
      if (err) {
      return console.log('Directorty already exists');
      }
    });
    body.forEach(function(user) {
      var avatarUrl = user.avatar_url;
      request.get({
        url: avatarUrl
      },
      function (err, response, body) {
        type = response.headers["content-type"].split('/')[1];
        var filePath = folder + user.id + '.' + type;
        download.download(avatarUrl, filePath);
      })
    });
  }
}