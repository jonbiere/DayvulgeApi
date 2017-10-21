const messagePublisher = require('../../amqp/publisherConnection');


const publishVoteMessage = (vulgeId, countryCode, isUpVote, user) => {
    
    let validationResult = isValidVote(vulgeId, user);
    if(!validationResult.success){
        return {success:false, error: validationResult.error};
    }

    let routingKey = `vote.${countryCode}.${vulgeId}`;
    let body = {vulgeId, countryCode, isUpVote, userId:user.id};

    messagePublisher.publish(routingKey, body);

    return {success:true};
}

const isValidVote = (vulgeId, user) =>{
    //TODO: Check user vote count, ensure vulge is on active ballot, ensure user is not owner of vulge

    return {success:true};
}

const vulgeService = {
    publishVoteMessage: publishVoteMessage
}
module.exports = vulgeService;