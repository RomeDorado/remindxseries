'use strict';
const request = require('request');
const {fetchEntity} = require('../utils');
const FBeamer = require('../fbeamer');
const f = new FBeamer('./config.FB');
//const createResponse = require('../person');
const config = require('../config');
const inquiry = (session, f) => {
  return ({sessionId, context, entities}) => {
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
        console.log(JSON.parse(body));
        if(!error && response.statusCode === 200) {
          
          resolve(createResponse(session, intent, JSON.parse(body)));
          
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
}

const createResponse = (sessionId, intent, tvshow) => {
  if(tvshow.Response === 'True') {
      console.log("napunta na siya sa create response");
    let {
      Title,
      Year,
      Plot,
      Director,
      Actors,
      Poster
    } = tvshow;

    switch(intent) {
    
      case 'tvInfo' : {          
        let str = `${Title} (${Year}). This film was directed by ${Director} and starred ${Actors}. ${Plot}`;    
        
        f.txt(sessionId, str);
        
      }
    }
  } else {
    return {
      text: "I don't seem to understand your question!",
      image: null
    }
  }
}

module.exports = inquiry;

