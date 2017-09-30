const amqp = require('amqp');
const amqpUrl = process.env.RABBITMQ_BIGWIG_TX_URL;

let connection = amqp.createConnection({ url: amqpUrl}, {defaultExchangeName: "dayvulgeExchange" });

// add this for better debuging
connection.on('error', function(e) {
  console.log("Error from amqp: ", e);
});

module.exports = connection;