const graphDb = require('../graphDb');
const Vulge = require('../models/vulge');

const getVulgeCollection = (collectionId) => {
    let query = `MATCH (c:VulgeCollection {collectionId:${collectionId}})-[:CONTAINS]->(n:Vulge) RETURN n`;
    
    let session = graphDb.session();

    return session.run(query).then(results =>{
        session.close();
        let response = results.records.map(row =>{
           return new Vulge(row.get("n"));
        });
        return response;
    });
} 

const vulgeRepo = {
    getVulgeCollection: getVulgeCollection
}

module.exports = vulgeRepo;