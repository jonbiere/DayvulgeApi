const apiRouter = require('express').Router();

apiRouter.use('/profile', require('./profileController'));
apiRouter.use('/vulge', require('./vulgeController'));
apiRouter.use('/timeline', require('./timelineController'));

module.exports = apiRouter;