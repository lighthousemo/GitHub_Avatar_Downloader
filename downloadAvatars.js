const request = require('request');
const fs = require("fs");
const getAvatar = require('./getAvatar.js');

require('dotenv').config();

const owner = process.argv[2];
const repo = process.argv[3];

function downloadAvatars(){
  if (process.argv.length !== 4) {
    console.log("Incorrect number of arguments given to program \nPlease enter arguments in this order: \n1. Repository Owner \n2. Repository Name");
  }

  else {
    fs.stat('./.env', function (err, stats) {
      if (err) {
        return console.log('Missing .env file with configuration information');
      }

    const userName = process.env['USER_NAME'];
    const api_token = process.env['GITHUB_API_TOKEN'];

    const endpoint = 'http://' + userName + ':' + api_token + '@api.github.com';
    getAvatar.get(owner, repo, endpoint);
    });
  }
}

downloadAvatars();