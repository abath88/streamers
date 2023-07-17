const db = require('../models');

const streamerController = {};

streamerController.getAll = (req, res) => {
  db.Streamer.find({}).sort({
      'votes': -1
    }).then( streamers => {
      return res.status(200).json(
        {
          success: true,
          data: streamers
        }
      );
    }).catch((error) => {
      return res.status(500).json({
        success: false,
        error
      });
    })
};

streamerController.create = (req, res) => {
  const {
    name,
    description,
    platform
  } = req.body;

  const streamer = new db.Streamer({
    name,
    description,
    platform,
  });

  streamer.save().then((newStreamer) => {
      return res.status(200).json({
        success: true,
        data: newStreamer
      });
    }).catch((error) => {
      return res.status(500).json({
        success: false,
        error
      });
    });
};

streamerController.getOne = (req, res) => {
  const { streamerId } = req.params;
  db.Streamer.findById(streamerId).populate('streams').then((streamer) => {
    if(streamer === null) {
      streamer.game = streamer.streams.map(el => el.game);
      streamer.game = new Array(new Set(streamer.game));
      
      return res.status(404).json({
        success: false,
        error: {
          message: 'Streamer not found'
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: streamer
    });
  }).catch((error) => {
    return res.status(500).json({
      success: false,
      error
    });
  });
};

streamerController.vote = (req, res) => {
  const { vote } = req.body;
  const { streamerId } = req.params;
  const userId = req.user._id.toHexString();
  db.Streamer.findById(streamerId).then(streamer => {
    if(streamer) {
      if(vote) {
        streamer.upvoted(userId) ? 
          streamer.unvote(userId):
          streamer.upvote(userId);
      } else {
        streamer.downvoted(userId) ? 
          streamer.unvote(userId):
          streamer.downvote(userId);
      }

      streamer.save();

      return res.status(200).json({
        success: true,
        data: streamer
      })
    }
    return res.status(404).json({
      success: false,
      error: {
        message: 'Streamer not found'
      }
    });
  }).catch((error) => {
    return res.status(500).json({
      success: false,
      error
    });
  });
};

module.exports = streamerController;