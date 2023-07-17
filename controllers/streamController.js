const db = require('../models');

const streamController = {};

streamController.add = async (req, res) => {
  const {
    title,
    description,
    game,
    link,
    startDate,
    endDate,
    id
  } = req.body;

  const stream = new db.Stream({
    title, description, game, link, startDate, endDate
  });

  try {
    const newStream = await stream.save();
    const streamer = await db.Streamer.findById(id);
    streamer.streams.push(stream);
    streamer.save();

    res.status(200).json({
      success: true,
      data: newStream
    });
  }catch( error ) {
    console.log(error);
    res.status(500).json({
      success: false,
      error
    });
  }
}



module.exports = streamController;