const 
  voting = require('mongoose-voting'),
  mongoose = require('mongoose'),
  { Schema } = require('mongoose'),

  streamerSchema = new Schema({
    name: { 
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: false
    },
    platform: {
      type: String,
      enum: ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble'],
      default: 'Twitch'
    }
  });

streamerSchema.plugin(voting);

const Streamer = mongoose.model('Streamer', streamerSchema);
module.exports = Streamer;
