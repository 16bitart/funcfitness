var mongoose = require("mongoose");

 var workoutSchema = new mongoose.Schema({
   title: String,
   date: {type: Date, default: Date.now},
   author: String,
   classification: String,
   duration: String,
   description: String,
   content: String
 });

 module.exports = mongoose.model('Workout', workoutSchema);
