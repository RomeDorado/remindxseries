'use strict';
const ObjectID = require('mongodb').ObjectID;
module.exports = (agenda, f) => {
  return agenda.define('cancelReminder', job => {
    const {fbid, id} = job.attrs.data;
    agenda.cancel({
      name: 'reminder',
      _id: new ObjectID(id)
    }, (error, numRemoved) => {
      f.txt(fbid, "Alright. I've canceled the reminder.");
    });
  });
}
