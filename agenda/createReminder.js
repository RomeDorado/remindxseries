'use strict';
const moment = require('moment');
module.exports = (agenda, f) => {
  return agenda.define('createReminder', job => {
    // Extract fbid, datetime and task from job
    const {fbid, datetime, task} = job.attrs.data;

    // Get the FB User's timezone
    f.getProfile(fbid)
      .then(profile => {
        const {first_name, timezone} = profile;
        // if datetime - timezonediff is 0 or minus then add
        const UTC_Offset = moment.utc(datetime).subtract(timezone, 'hours');
        let timeDiff = UTC_Offset.diff(new Date());
        let scheduleTime = timeDiff <= 0 ? datetime : UTC_Offset.toDate();
        //const UTC_Offset_Date = moment.utc(datetime).subtract(timezone, 'hours').toDate();
        console.log(`Schedule Time: ${scheduleTime}`);
        // Setup the job
        agenda.schedule(scheduleTime, 'reminder', {
          fbid,
          first_name,
          task
        });
      })
      .catch(error => console.log(error));
    // Compute an offset from UTC before scheduling the task
  });
}
