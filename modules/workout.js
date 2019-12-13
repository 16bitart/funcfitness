var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://testuser:testpassword@devcluster-9bzzo.mongodb.net/test?retryWrites=true&w=majority",
 {dbName: 'funcfitness', useNewUrlParser: true, useUnifiedTopology: true});

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