'use strict';
const request = require('request');
const {fetchEntity} = require('../utils');
const createResponse = require('../utils');
const config = require('../config');
const inquiry = ({sessionId, context, entities}) => {
  /*
  let intent = data.entities.intent && data.entities.intent[0].value || 'tvInfo';
  let tvshow = data.entities.tvshow && data.entities.tvshow[0].value || null;
  */
  let intent = fetchEntity(entities, 'intent') || tvInfo;
  let tvshow = fetchEntity(entities, 'tvshow') || null;
  return new Promise((resolve, reject) => {
    if(intent && tvshow) {
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
      reject("Entities not found!");
    }
  });
}

module.exports = inquiry;
