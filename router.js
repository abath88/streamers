const
  routes = require('express').Router(),
  streamerController = require('./controllers/streamerController'),
  userController = require('./controllers/userController');

//User Routes
routes.post('/signup', userController.signUp);
routes.post('/signin', userController.signIn);

//Streamers Routes
routes.get('/streamers', streamerController.getAll);
routes.post('/streamers', streamerController.create);

routes.get('/streamer/:streamerId', streamerController.getOne);
routes.put('/streamer/:streamerId/vote', streamerController.vote);

module.exports = routes;