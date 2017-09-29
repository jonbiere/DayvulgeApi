const graphDb = require('./data/graphDb')
const Chance = require('chance');

/* Clear all Nodes

MATCH (n)
OPTIONAL MATCH (n)-[r]-()
DELETE n,r

//Example Relationship Syntax
//CREATE (Keanu)-[:ACTED_IN {roles:['Neo']}]->(TheMatrix)
*/


const seed = () => {
  var chance = new Chance();

  var cypherCode = "CREATE (group1:VulgeCollection {collectionId:1})";
  cypherCode += "CREATE (group2:VulgeCollection {collectionId:2})";
  for (var i = 1; i <= 100; i++) {
    var randomContent = chance.sentence({words: chance.integer({min:5, max:20})});
    cypherCode += `CREATE (a${i}:Vulge {content:"${randomContent}", createdAt:"${chance.date({string:true, year: 2017})}", upVotes:${chance.integer({min: 0, max: 200})}, downVotes:${chance.integer({min: 0, max: 200})}})`;
    cypherCode += `CREATE (group${chance.integer({min:1, max:2})})-[:CONTAINS]->(a${i})`;
    if (i % 5 == 0) {
      var randomName = chance.name();
      cypherCode += `CREATE(u${i}:User {name:"${randomName}"})`;

      for (var j = 0; j < 5; j++) {
        cypherCode += `CREATE(u${i})-[:AUTHOR_OF]->(a${i - j})`;
      }
    }  

  }
  const session = graphDb.session();
  const resultPromise = session.run(cypherCode).then(result => {
    session.close();
    console.log("Graph Database Seeded");
    return null;
  });

  return resultPromise;
}



module.exports = seed;
