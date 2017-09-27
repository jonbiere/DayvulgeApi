const neo4j = require('neo4j-driver').v1;
const graphDb = neo4j.driver(process.env.NEO4j_BOLT_URL, neo4j.auth.basic(process.env.NEO4j_BOLT_USER, process.env.NEO4j_BOLT_PASSWORD));


process.on('exit', function () {
    graphDb.close();
});

module.exports = graphDb;