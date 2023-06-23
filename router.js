const
  routes = require('express').Router(),
  streamerController = require('./controllers/streamerController');

//Streamers Routes
routes.get('/streamers', streamerController.getAll);
routes.post('/streamers', streamerController.create);

routes.get('/streamer/:streamerId', streamerController.getOne);
routes.put('/streamer/:streamerId/vote', streamerController.vote);

module.exports = routes