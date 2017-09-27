const neo4j = require('neo4j-driver').v1;
const dbUri = 'bolt://localhost:7687';
const user = 'neo4j';
const password = '875688n64';
const driver = neo4j.driver(dbUri, neo4j.auth.basic(user, password));
const session = driver.session();
var Chance = require('chance');

/* Clear all Nodes

MATCH (n)
OPTIONAL MATCH (n)-[r]-()
DELETE n,r
*/


const seed = () => {
  console.log("Start Seeding.....");

  var chance = new Chance();

  var cypherCode = "";
  for (var i = 1; i <= 100; i++) {
    var randomContent = chance.paragraph();
    cypherCode += `CREATE (a${i}:Vulge {content:"${randomContent}"})`;

    if (i % 5 == 0) {
      var randomName = chance.name();
      cypherCode += `CREATE(u${i}:User {name:"${randomName}"})`;

      for (var j = 0; j < 5; j++) {
        cypherCode += `CREATE(u${i})-[:AUTHOR_OF]->(a${i - j})`;
      }
    }


    //CREATE (Keanu)-[:ACTED_IN {roles:['Neo']}]->(TheMatrix)

  }

  const resultPromise = session.run(cypherCode).then(result => {
    session.close();
    console.log("Database Seeded.");
    return null;
  });


}

process.on('exit', function () {
  driver.close();
});

module.exports = seed;
