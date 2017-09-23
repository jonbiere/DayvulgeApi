const router = require('express').Router();

router.use('/auth', require('./controllers/authController'));

router.use('/api', require('./controllers'));

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

module.exports = router;