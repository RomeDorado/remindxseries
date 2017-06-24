'use strict'
module.exports = (agenda, f) => {
const createResponse = (intent, tvshow, context) => {
  
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
    

 send(request, response) {
      const {sessionId, context, entities} = request;
      const {text, quickreplies} = response;
      return new Promise((resolve, reject) => {
        let {fbid} = session.get(sessionId);
        if(quickreplies) {
          let buttons = quickreplies.map(title => {
            return {
              title,
              content_type: "text",
              payload: "null"
            }
          });

          f.quick(fbid, {
            text,
            buttons
          });
        } else {
          f.txt(fbid, text);
        }
        return resolve();
      });
    }


    switch(intent) {
    
      case 'tvInfo' : {          
        let str = `${Title} (${Year}). This film was directed by ${Director} and starred ${Actors}. ${Plot}`;   
        console.log(str);
        //return ({sessionId, context, entities}) => { 
        //f.txt();



          
     //   }      
        
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
}
//module.exports = createResponse;