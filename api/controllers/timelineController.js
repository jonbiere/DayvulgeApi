const router = require('express').Router();
const timelineRepo = require('../../data/repositories/timelineRepository')

// api/timeline/:timelineId
router.get('/:timelineId', (req, res) =>{
    let timelineId = req.params['timelineId'];
    
    timelineRepo.getTimeline(timelineId).then(results =>{
        res.json(results);
    });
});

router.get('/traverse/:timelineId/:nodeLimit', (req, res)=>{
    let timelineId = req.params['timelineId'];
    let nodeLimit = req.params['nodeLimit'];
    
    //ensure its not more than 50 for now
    nodeLimit = nodeLimit >= 50 ? 50 : nodeLimit;

    timelineRepo.traverseTimeline(timelineId, nodeLimit).then(results =>{

    });
});

module.exports = router;