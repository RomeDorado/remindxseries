'use strict';
const request = require('request');
const {fetchEntity} = require('../utils');
const createResponse = require('../person');
const config = require('../config');
const getInfo = data => {
  let intent = fetchEntity(entities, 'intent') || "tvInfo";
  let tvshow = fetchEntity(entities, 'tvshow') || null; 
  return new Promise((resolve, reject) => {
    if(tvshow) {
      // Fetch data from OMDB
      request({
        uri: "https://www.omdbapi.com",
        qs: {
          t: tvshow,
          plot: 'short',
          r: 'json',
          apiKey: config.OMDB_API_KEY
        },
        method: 'GET'
      }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
          resolve(createResponse(intent, JSON.parse(body)));
        } else {
          reject(error);
        }
      });

    } else {
      reject("Entities not found in omdb!");
    }
  });
}

module.exports = getInfo;
