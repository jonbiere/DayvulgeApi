let processMessage = require('./processMessage');

let voteConsumer = (connection) => {
    // Wait for connection to become established.
    connection.on('ready', function () {        
        connection.queue('voteQueue', {durable:true}, function (q) {
            // Catch all messages
            q.bind('dayvulgeExchange','#');

            // Receive messages
            q.subscribe(processMessage);
        });
    });

    return connection;
};

module.exports = voteConsumer;