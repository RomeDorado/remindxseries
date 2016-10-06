'use strict';

module.exports = (session, f) => {
  return ({sessionId, context, entities}) => {
    return new Promise((resolve, reject) => {
      let {fbid} = session.get(sessionId);
      f.quick(fbid, {
        text: "Hey there! Do you want to be reminded of something?",
        buttons: [
          {
            content_type: "text",
            title: "Yes",
            payload: "Yes"
          },
          {
            content_type: "text",
            title: "No",
            payload: "No"
          }
        ]
      });
      resolve(context);
    });
  }
}
