//Node Properties
//{timelineId:3, name:"Personal Timeline1", type:"Personal"}
class Timeline {
    constructor(node) {
      Object.assign(this, node.properties);
      if (this.timelineId) {
        this.timelineId = this.timelineId.toNumber();
      }
    }
  }
  
  module.exports = Timeline