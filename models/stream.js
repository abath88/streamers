const 
  voting = require('mongoose-voting'),
  mongoose = require('mongoose'),
  { Schema } = require('mongoose')

  streamSchema = new Schema({
    title: { type: String, require: true, maxlength: 50 },
    description: { type: String, require: true},
    game: { type: String, require: true },
    link: { type: String, require: true},
    startDate: { type: Date, require: true, default: Date.now() },
    endDate: { type: Date, require: true, default: Date.now() }
  }),
  
  Stream = mongoose.model('Stream', streamSchema);

module.exports = Stream