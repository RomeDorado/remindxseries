'use strict'

const createResponse = (intent, tvshow) => {
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
        
        return {
          text: str,
          image: Poster
        }      
        
      }
    }
  } else {
    return {
      text: "I don't seem to understand your question!",
      image: null
    }
  }
}

module.exports = createResponse;