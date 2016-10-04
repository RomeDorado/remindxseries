'use strict';
const ObjectID = require('mongodb').ObjectID;
module.exports = (agenda, f) => {
  return agenda.define('cancelReminder', job => {
    const {fbid, id} = job.attrs.data;
    agenda.cancel({
      name: 'reminder',
      _id: new ObjectID(id)
    }, (error, numRemoved) => {
      if(numRemoved > 0) {
        f.txt(fbid, "Alright. I've canceled the reminder.");
      } else {
        f.txt(fbid, "I've already removed this reminder for you! :)");
      }

    });
  });
}
