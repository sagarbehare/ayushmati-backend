const cron = require('node-cron');

const sendEmail = require('../mail/sendEmail');


// Define the cron job schedule
// This example runs the job every minute

function nurseAlertCronJob(){
    cron.schedule('*/15 * * * *', () => {

      sendEmail();

     console.log('Cron job is running...');
    });
}

module.exports = nurseAlertCronJob;

