'use strict';
const request = require('request');
const {fetchEntity} = require('../utils');
const createResponse = require('../person');
const config = require('../config');
const inquiry = ({sessionId, context, entities}) => {
  /*
  let intent = data.entities.intent && data.entities.intent[0].value || 'tvInfo';
  let tvshow = data.entities.tvshow && data.entities.tvshow[0].value || null;
  */
  let intent = fetchEntity(entities, 'intent') || "tvInfo";
  let tvshow = fetchEntity(entities, 'tvshow') || null;
  return new Promise((resolve, reject) => {
    if(intent && tvshow) {
      console.log("intent is "+ intent +  " and tvshow is" +  tvshow);
      // Fetch data from OMDB
      request({
        uri: "https://www.omdbapi.com",
        qs: {
          t: tvshow,
          plot: 'short',
          r: 'json',
          apiKey: '270b7488'
        },
        method: 'GET'        
      }, (error, response, body) => {
        console.log(response.statusCode);
        //console.log(JSON.parse(body));
        if(!error && response.statusCode === 200) {
          //console.log(JSON.parse(sessionId));
          resolve(createResponse(intent, JSON.parse(body)), sessionId);
          
        } else {
          reject(error);
        }
      });

    } else {
      reject("Entities not found in inquiry!");
    }
    return resolve(context);
  });
}

module.exports = inquiry;

