const graphDb = require('./graphDb')
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
  //first delete all existing data
  var cypherCode = "MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r";

  const session = graphDb.session();
  const resultPromise = session.run(cypherCode).then(result =>{
  
    //Vulge Ballots
    cypherCode = "CREATE (group1:VulgeCollection {collectionId:1})";
    cypherCode += "CREATE (group2:VulgeCollection {collectionId:2})";
    
    //Vulges
    for (var i = 1; i <= 100; i++) {
      var randomContent = chance.sentence({words: chance.integer({min:5, max:25})});
      cypherCode += `CREATE (a${i}:Vulge {content:"${randomContent}", createdAt:"${chance.date({string:true, year: 2017})}", upVotes:${chance.integer({min: 0, max: 200})}, downVotes:${chance.integer({min: 0, max: 200})}})`;
      cypherCode += `CREATE (group${chance.integer({min:1, max:2})})-[:CONTAINS]->(a${i})`;
      
      //Users
      if (i % 5 == 0) {
        var randomName = chance.name();
        cypherCode += `CREATE(u${i}:User {name:"${randomName}"})`;

        for (var j = 0; j < 5; j++) {
          cypherCode += `CREATE(u${i})-[:AUTHOR_OF]->(a${i - j})`;
        }
      }  
    }

    //Timelines
    cypherCode += `CREATE (timeline1:Timeline {timelineId:1, name:"Public Timeline1", type:"Public"})`;
    cypherCode += `CREATE (timeline2:Timeline {timelineId:2, name:"Private Timeline1", type:"Private"})`;
    cypherCode += `CREATE (timeline3:Timeline {timelineId:3, name:"Personal Timeline1", type:"Personal"})`;

    cypherCode += `CREATE (timeline1)-[:HAS_OWNER]->(u5)`;
    cypherCode += `CREATE (timeline2)-[:HAS_OWNER]->(u10)`;
    cypherCode += `CREATE (timeline3)-[:HAS_OWNER]->(u15)`;

    cypherCode += `CREATE (timeline1)-[:HAS_ACTIVE_BALLOT]->(group1)`;
    cypherCode += `CREATE (timeline2)-[:HAS_ACTIVE_BALLOT]->(group2)`;
    
    cypherCode += `CREATE (timeline3)-[:FIRST_NODE]->(a1)`;
    cypherCode += `CREATE (timeline1)-[:FIRST_NODE]->(a2)`;
    cypherCode += `CREATE (timeline2)-[:FIRST_NODE]->(a3)`;

    cypherCode += `CREATE (a1)-[:NEXT_NODE]->(a4)`;
    cypherCode += `CREATE (a4)-[:NEXT_NODE]->(a5)`;
    cypherCode += `CREATE (a5)-[:NEXT_NODE]->(a6)`;

    cypherCode += `CREATE (a2)-[:NEXT_NODE]->(a7)`;
    cypherCode += `CREATE (a7)-[:NEXT_NODE]->(a8)`;
    cypherCode += `CREATE (a8)-[:NEXT_NODE]->(a9)`;

    cypherCode += `CREATE (a3)-[:NEXT_NODE]->(a10)`;
    cypherCode += `CREATE (a10)-[:NEXT_NODE]->(a11)`;
    cypherCode += `CREATE (a11)-[:NEXT_NODE]->(a55)`;
    
    session.run(cypherCode).then(result => {
      session.close();
      console.log("Graph Database Seeded");
      return null;
    });
  });

  return resultPromise;
}

if (require.main === module){
  seed();
}

module.exports = seed;
