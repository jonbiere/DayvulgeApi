const cron = require("cron");
const onTick = require("./ontick");

let vulgeWinnerCronJob = new cron.CronJob({
    cronTime: '0 */15 * * * *',
    //cronTime: '0 0 0 * * *',
    onTick: onTick,
    start: false,
    timeZone: 'America/Chicago'
})


module.exports = vulgeWinnerCronJob;