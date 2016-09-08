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
        const UTC_Offset_Date = moment.utc(datetime).subtract(timezone, 'hours').toDate();
        console.log(`Timezone: ${timezone}`);
        console.log(`Server : ${new Date()}`);
        console.log(`Calculated Date: ${UTC_Offset_Date}`);
        // Setup the job
        agenda.schedule(UTC_Offset_Date, 'reminder', {
          fbid,
          first_name,
          task
        });
      })
      .catch(error => console.log(error));
    // Compute an offset from UTC before scheduling the task
  });
}
