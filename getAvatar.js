const request = require('request');
const getAvatarUrl = require('./getAvatarUrl.js');

module.exports = {
  get: function (repoOwner, repoName, endpoint) {
    request.get({
      url: endpoint + '/repos/' + repoOwner + '/' + repoName + '/contributors',
      headers: {
        'User-Agent': 'sammytam0430'
      },
      json: true
    }, function (err, incomingMessage, responseBody) {
      var statuscode = incomingMessage.headers.status.split(' ')[0];
      console.log(statuscode);

      switch (statuscode) {
        case '401':
          console.log("Incorrect credentials in .env file");
          break;
        case '404':
          console.log("Nonexisting owner/repo provided");
          break;
        default:
          if (err) {
            return console.log(err);
          }
          getAvatarUrl.get(responseBody);
      }
    })
  }
}