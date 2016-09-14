const request = require('request');
const fs = require("fs");
var download = require('./download.js')

module.exports = {
  get: function (repoOwner, repoName, fileName, endpoint) {
    folder = './' + fileName + '/';

    request.get({
      url: endpoint + '/repos/' + repoOwner + '/' + repoName + '/contributors',
      headers: {
        'User-Agent': 'sammytam0430'
      },
      json: true
    }, function (err, incomingMessage, responseBody) {
      var statuscode = incomingMessage.headers.status.split(' ')[0];
      if (statuscode === 401) {
        return console.error("Incorrect credentials in .env file")
      }

      else if (statuscode === 404) {
        return console.error("Nonexisting owner/repo provided")
      }

      else {
        if (err) {
          return console.log(err);
        }

        fs.mkdir(folder,function(err) {
          if (err) {
          return console.log('Directorty ' + fileName + ' already exists');
          }
        });

        responseBody.forEach(function(user) {
          var avatarUrl = user.avatar_url;

          request.get({
            url: avatarUrl
          }, function (err, response, body) {
            type = response.headers["content-type"].split('/')[1];
            var filePath = folder + user.id + '.' + type;
            download.download(avatarUrl, filePath);
          })
        });
      }
    })
  }
}