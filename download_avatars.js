const request = require('request');
const fs = require("fs");

var getAvatar = require('./getAvatar.js')

var owner = process.argv[2]
var repo = process.argv[3];
var fileName = process.argv[4];

function downloadAvatars(){
  if (process.argv.length !== 5) {
    console.log("Incorrect number of arguments given to program \nPlease enter arguments in this order: \n1. Repository Owner \n2. Repository Name \n3. File Name");
  }

  else {
    fs.stat('./.env', function (err, stats) {
      if (err) {
        return console.log('Missing .env file with configuration information');
      }

    require('dotenv').config();
    var userName = process.env['USER_NAME'];
    var api_token = process.env['GITHUB_API_TOKEN'];

    const endpoint = 'http://' + userName + ':' + api_token + '@api.github.com';
    getAvatar.get(owner, repo, fileName, endpoint);
    });
  }
}

downloadAvatars();