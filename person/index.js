'use strict';
const createResponse = (intent, tvshow) => {
  console.log(intent + " " + tvshow );
  if(tvshow.Response === 'True') {
    let {
      Title,
      Type,
      Year,
      Plot,
      Director,
      Actors,
      Poster,
      Released,
      Writer,
      totalSeasons
    } = tvshow;

    switch(intent) {
      case 'tvInfo' : {
        let str = `${Title} (${Year}). This film was directed by ${Director} and starred ${Actors}. ${Plot}`;
        return {
          text: str,
          image: Poster
        }
      }

      case 'director' : {
        let str = `${Title} (${Year}) was directed by ${Director} and written by ${Writer}.`;
        return {
          text: str,
          image: null
        }
      }

      case 'cast': {
        let str = `The main cast of ${Title} (${Year}) are ${Actors}.`;
        return{
          text: str,
          image: null
        }
      }

      case 'releaseYear': {
        let str = `${Title} was released on ${Released}.`;
        return{
          text: str,
          image: null
        }
      }

      case 'numberOfSeasons': {
        if(Type == 'movie'){
          let str = `${Title} is not a TV Series. Please try again.`;
          return{
            text: str,
            image: null
          }
        }
        else if(Type == 'series'){
          let str = `${Title} currently has ${totalSeasons} season(s).`;
          return{
            text: str,
            image: null
          }
        }
      }

      // default: {
      //   return {
      //     text: "Always at your service :)",
      //     image: null
      //   }
      // }
    }
  }
}
/*

const createResponsePerson = (intent, person) => {
  if(person.Response === 'True'){
    console.log("Person mo ito");
    let results = {
      name,
      profile_path
    } = person;

    switch(intent){

      case 'personInfo': {
        let str = `${name} is an actor. :)`;
        return{
          text: str,
          image: profile_path
        }
      }

    }

  } else {
    return {
      text: "I don't seem to understand your question!",
      image: null
    }
  }
  console.log(intent + " " + tvshow + " " + person);
}

*/
module.exports = createResponse;
