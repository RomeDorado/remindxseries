'use strict'

const createResponse = (intent, tvshow) => {
  if(tvshow) {
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
        let str = `${Title} (${Year}).`;
        console.log(str);
        return {
          text: str,
          image: Poster
        }
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

module.exports = createResponse;
