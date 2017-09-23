const router = require('express').Router();

// api/profile/:id
router.get('/:id', (req, res) => {
    res.json({
        picture: 'http://via.placeholder.com/150x150',
        aboutMe: 'Cheese curds, booya, and beer. Thats what I like to hear!'
    });
});

module.exports = router;