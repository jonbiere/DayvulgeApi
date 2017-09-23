const router = require('express').Router();

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

router.get('/collection/:groupId', (req, res) =>{
    res.json(fakeVulges);
});


const fakeVulges = [
    {
        id:1,
        content: "Jake the Fake. I mean snake.",
        upVotes: 10,
        downVotes:3,
        createAt: Date.now(),
        updatedAt: Date.now(),
        userId: 1
    },
    {
        id:2,
        content: "Hey there!",
        upVotes: 11,
        downVotes:3,
        createAt: Date.now(),
        updatedAt: Date.now(),
        userId: 1
    },
    {
        id:3,
        content: "Hurricane Irma",
        upVotes: 1,
        downVotes:3,
        createAt: Date.now(),
        updatedAt: Date.now(),
        userId: 1
    },
    {
        id:4,
        content: "What is more orange? A carrot or the POTUS.",
        upVotes: 13,
        downVotes:30,
        createAt: Date.now(),
        updatedAt: Date.now(),
        userId: 1
    },
    {
        id:5,
        content: "Blah blah blah blah blah blah.",
        upVotes: 10,
        downVotes:3,
        createAt: Date.now(),
        updatedAt: Date.now(),
        userId: 1
    },
    {
        id:6,
        content: "Hello.",
        upVotes: 3,
        downVotes:9,
        createAt: Date.now(),
        updatedAt: Date.now(),
        userId: 1
    }

];
module.exports = router;