const amqp = require('amqp');
const amqpUrl = process.env.RABBITMQ_BIGWIG_RX_URL;

let consumerConnection = () => {
    let connection = amqp.createConnection({ url: amqpUrl});

    // add this for better debuging
    connection.on('error', function (e) {
        console.log("Error from amqp: ", e);
    });

    return connection;
}

module.exports = consumerConnection;