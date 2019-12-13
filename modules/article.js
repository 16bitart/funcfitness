var mongoose = require("mongoose");

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
