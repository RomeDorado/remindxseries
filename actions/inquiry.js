'use strict';
const request = require('request');
const {fetchEntity} = require('../utils');
//const createResponse = require('../utils');
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
          apiKey: config.OMDB_API_KEY
        },
        method: 'GET'
      }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
          consle.log("body" + JSON.parse(body));
          resolve(createResponse(intent, JSON.parse(body)));
          
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

const createResponse = (intent, tvshow) => {
  if(tvshow.Response === 'True') {
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
        /*return {
          text: str,
          image: Poster
        }*/

        f.txt(fbid, str);
      }

      // case 'releaseYear' : {
      //   let str = `${Title} was released in ${Year}.`;
      //   return {
      //     text: str,
      //     image: null
      //   }
      // }
      //
      case 'director' : {
        let str = `${Title} (${Year}) was directed by ${Director}.`;
        return {
          text: str,
          image: null
        }
      }
      //
      // default: {
      //   return {
      //     text: "Always at your service :)",
      //     image: null
      //   }
      // }
    }
  } else {
    return {
      text: "I don't seem to understand your question!",
      image: null
    }
  }
}
