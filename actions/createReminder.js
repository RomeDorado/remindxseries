'use strict';
const {fetchEntity} = require('../utils');
const createReminder = (session, agenda) => {
  return ({sessionId, context, entities}) => {
    return new Promise((resolve, reject) => {
      // Fetch and extract entities
      let task = fetchEntity(entities, 'task');
      let datetime = fetchEntity(entities, 'datetime');

      // Update context with task and time
      if(!datetime) {
        context.missingTime = true;
      } else {
        delete context.missingTime;
        context.datetime = datetime;
      }

      if(!task) {
        context.missingTask = true;
      } else {
        delete context.missingTask;
        context.task = task;
      }

      if(context.datetime && context.task) {
        context.jobDone = true;
        // Fetch fbid of the user
        let {fbid} = session.get(sessionId);
        // Call Agenda to set a reminder
        agenda.now('createReminder', {
          fbid,
          datetime,
          task: context.task || task
        });
      }
      // if(!datetime) {
      //   context.task = task;
      //   context.missingTime = true;
      //   delete context.jobDone;
      // } else {
      //   delete context.missingTime;
      //   context.jobDone = true;
      //   // Fetch fbid of the user
      //   let {fbid} = session.get(sessionId);
      //   // Call Agenda to set a reminder
      //   agenda.now('createReminder', {
      //     fbid,
      //     datetime,
      //     task: context.task || task
      //   });
      // }

      // Resolve with the updated context
      return resolve(context);
    });
  }
}

module.exports = createReminder;
