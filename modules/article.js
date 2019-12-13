var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://testuser:testpassword@devcluster-9bzzo.mongodb.net/test?retryWrites=true&w=majority",
 {dbName: 'funcfitness', useNewUrlParser: true, useUnifiedTopology: true});

 var articleSchema = new mongoose.Schema({
   title: String,
   author: String,
   image: String,
   date: {type: Date, default: Date.now},
   description: String,
   content: String
 });

var Article = mongoose.model('Article', articleSchema);
 module.exports = Article;