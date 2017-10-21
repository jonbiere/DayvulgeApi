const router = require('express').Router();
const vulgeRepo = require('../../data/repositories/vulgeRepository');
const vulgeService = require('../services/vulgeService');
const authCheck = require('./isAuthenticated');

// api/vulge/:id
router.get('/:id', (req, res) => {
    res.json({
        id:1,
        content: "Jake the Fake. I mean snake.",
        upVotes: 10,
        downVotes:3,
        createAt: Date.now(),
        updatedAt: Date.now(),
        userId: 1
    });
});

router.get('/collection/:collectionId', (req, res) =>{
    let collectionId = req.params['collectionId'];
    
    vulgeRepo.getVulgeCollection(collectionId).then(results =>{
        res.json(results);
    });
});

//api/vulge/vote
router.post('/vote', authCheck, (req, res) => {
    let {isUpVote, vulgeId} = req.body;
    
    //TODO: get client country code from IP
   
    let result = vulgeService.publishVoteMessage(vulgeId, 'US', isUpVote, req.user);

    if(result.success){
        res.status(200).json({status:"ok"});
    }
    else{
        res.status(400).json({error: result.error});
    }

  });

module.exports = router;