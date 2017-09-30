//Attatch Evn Variables
require('dotenv').config();

//Start Cron Jobs
let vulgeWinnerJob = require('./jobs/vulgeWinner');

console.log('Starting Jobs And Consumers...')
vulgeWinnerJob.start();


//Start Amqp Consumers
const voteConsumerConn = require('./amqp/consumerConnection')();
const voteConsumer = require('./consumers/voteConsumer')(voteConsumerConn);

voteConsumer.connect();

console.log('All Jobs/Consumers Started.')