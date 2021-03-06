'use strict';
const endConversation = require('./endConversation');
const inquire = require('./inquiry');
const create = require('./createReminder');
const show = require('./showReminders');
module.exports = (session, f, agenda) => {
  let createReminder = create(session, agenda);
  let showReminders = show(session, agenda);  
  let inquiry = inquire(session, agenda);  
  const actions = {
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
    },
    createReminder,
    showReminders,
    endConversation,
    inquiry
  }

  return actions;
}
