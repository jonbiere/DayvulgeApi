const apiRouter = require('express').Router();

apiRouter.use('/profile', require('./profileController'));
apiRouter.use('/vulge', require('./vulgeController'));

module.exports = apiRouter;