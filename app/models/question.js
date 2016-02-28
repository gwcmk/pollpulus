// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question: String,
  answer_ids: [String],
  author_id: String,
  votes: Number
});

QuestionSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Question', QuestionSchema);

