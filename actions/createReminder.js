'use strict';
const {fetchEntity} = require('../utils');
const createReminder = (session, agenda) => {
  return ({sessionId, context, entities}) => {
    return new Promise((resolve, reject) => {
      // Fetch and extract entities
      let task = fetchEntity(entities, 'task');
      let datetime = fetchEntity(entities, 'datetime');

      if(!datetime && task) {
        context.missingTime = true;
        context.task = task;
      }

      if(!task && datetime) {
        context.missingTask = true;
        context.datetime = datetime;
      }
      // Update context with task and time
      if(!task && !datetime) {
        context.missingTask = true;
        context.missingTime = true;
      }

      if(context.datetime && context.task) {
        delete context.missingTime;
        delete context.missingTask;
        context.jobDone = true;
        console.log(`Task: ${context.task} at ${context.datetime}`);
        // Fetch fbid of the user
        let {fbid} = session.get(sessionId);
        // Call Agenda to set a reminder
        agenda.now('createReminder', {
          fbid,
          datetime,
          task: context.task
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
