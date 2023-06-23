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
  db.Streamer.findById(streamerId).then((streamer) => {
    if(streamer === null) {
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
  db.Streamer.findByIdAndUpdate(streamerId, { 
    $inc: { votes: vote > 0 ? 1 : -1 }
  }, {new: true}).then(streamer => {
    return res.status(200).json({
      success: true,
      data: streamer
    })
  }).catch((error) => {
    return res.status(500).json({
      success: false,
      error
    });
  });
};

module.exports = streamerController;