const
  routes = require('express').Router(),
  streamerController = require('./controllers/streamerController'),
  userController = require('./controllers/userController'),
  streamController = require('./controllers/streamController'),
  passport = require('passport');

//User Routes
routes.post('/signup', userController.signUp);
routes.post('/signin', userController.signIn);

//Streamers Routes
routes.get('/streamers', streamerController.getAll);
routes.post('/streamers', passport.authenticate('jwt', { session: false }), streamerController.create);

routes.get('/streamer/:streamerId', streamerController.getOne);
routes.put('/streamer/:streamerId/vote', passport.authenticate('jwt', { session: false }), streamerController.vote);

routes.post('/stream', streamController.add);

module.exports = routes;