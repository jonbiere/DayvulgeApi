const graphDb = require('../graphDb');
const Timeline = require('../models/timeline');

const getTimeline = (timelineId) => {
    let query = `MATCH (t:Timeline {timelineId:${timelineId}}) RETURN t`;
    
    let session = graphDb.session();

    return session.run(query).then(results =>{
        session.close();
        let response = results.records.map(row =>{
           return new Timeline(row.get("t"));
        });
        return response[0];
    });
} 

const traverseTimeline = (timelineId, nodeLimit) => {
    return [];
};

const timelineRepo = {
    getTimeline: getTimeline,
    traverseTimeline: traverseTimeline
}

module.exports = timelineRepo;