// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  answer: String,
  votes: Number
});

AnswerSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Answer', AnswerSchema);

