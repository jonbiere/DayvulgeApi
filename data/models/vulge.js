//Node Properties
//userId, content, createdAt, upVotes, downVotes
class Vulge {
  constructor(node) {
    Object.assign(this, node.properties);
    if (this.userId) {
      this.userId = this.userId.toNumber();
    }
    if(this.upVotes){
      this.upVotes = this.upVotes.toNumber();
    }
    if(this.downVotes){
      this.downVotes = this.downVotes.toNumber();
    }
  }
}

module.exports = Vulge