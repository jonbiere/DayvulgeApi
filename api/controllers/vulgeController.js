const router = require('express').Router();
const vulgeRepo = require('../../data/repositories/vulgeRepository')

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

module.exports = router;