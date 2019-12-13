// ********************************************* //
//Application Configuration
// ********************************************* //

var express = require("express");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var bodyParser = require ("body-parser");
var Article = require("./modules/article.js");
var Workout = require("./modules/workout.js");
var app = express();

let port = process.env.PORT || 3000;
let connStr = process.env.CONNECTION_STRING;

mongoose.connect(connStr,
 {dbName: 'funcfitness', useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs"); //render ejs files by default
app.use(express.static("public")); // serve the public directory
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); // ?_method=PUT/DELETE/UPDATE in the query string
app.use(expressSanitizer()); //after body-parser


// ********************************************* //
// DB Seeding
// ********************************************* //

// Article.create({
//   title: "A test article.",
//   image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//   description: "A test article to test articles.",
//   content: "This is a lot of text. This is a lot of text. This is a lot of text. This is a lot of text. This is a lot of text. This is a lot of text. This is a lot of text."
// }, (err, article) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(article);
//   }
// });

var featArticle;
var featWorkout;

Article.findById("5db636f1be25435b9c1ee995", (err, foundArticle) => {
  if (err) {
    console.log(err)
  } else {
    featArticle = foundArticle;
  }
});

Workout.findById("5db63a6fbe25435b9c1ee996", (err, foundWorkout) => {
  if (err) {
    console.log(err)
  } else {
    featWorkout = foundWorkout;
  }
});


// ********************************************* //
//Routes
// ********************************************* //

app.get("/", (req, res) => {
  res.render("landing", {article: featArticle, workout: featWorkout});
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/supersecretadmin", (req, res) => {
  Workout.find({}, (err, foundWorkouts) => {
    if (err) {
      console.log(err)
    } else {
      Article.find({}, (err, foundArticles) => {
        if (err) {
          console.log(err)
        } else {
          res.render("admin", {articles: foundArticles, workouts: foundWorkouts});
        }
      });
    }
  });
});

// ********************************************* //
//ROUTES - ARTICLES
// ********************************************* //

//Index
app.get("/article", (req, res) => {
  Article.find({}, (err, articles) => {
    if(err){
      console.log(err);
    } else {
      res.render("articles", {articles: articles});
    }
  });
});

//New
app.get("/article/new", (req, res) => {
  res.render("newarticle");
});

//Create
app.post("/article", (req, res) => {
  req.body.article.content = req.sanitize(req.body.article.content);
  Article.create(req.body.article, (err, article) => {
    if (err) {
      res.render("newarticle");
    } else {
      console.log(article);
      res.redirect("/article");
    }
  })
});

//Show
app.get("/article/:id", (req, res) => {
  Article.findById(req.params.id, (err, foundArticle) => {
    if (err) {
      res.redirect("/article");
    } else {
      res.render("showarticle", {article: foundArticle});
    }
  });
});

//Edit
app.get("/article/:id/edit", (req, res) => {
  Article.findById(req.params.id, (err, foundArticle) => {
    if(err) {
      res.redirect("/article")
    } else {
      res.render("editarticle", {article: foundArticle});
    }
  });
});

//Update
app.put("/article/:id", (req, res) => {
  req.body.article.content = req.sanitize(req.body.article.content);
  Article.findByIdAndUpdate(req.params.id, req.body.article, (err, foundArticle) => {
    if (err) {
      res.redirect("/article");
    } else {
      res.redirect("/article/" + req.params.id);
    }
  });
});

//Delete
app.delete("/article/:id", (req, res) => {
  Article.findByIdAndDelete(req.params.id, (err) => {
    res.redirect("/article");
  });
});

// ********************************************* //
//ROUTES - WORKOUTS
// ********************************************* //

//Index
app.get("/workout", (req, res) => {
  Workout.find({}, (err, workouts) => {
    if(err){
      console.log(err)
    } else {
      res.render("workouts", {workouts: workouts});
    }
  });
});

//New

app.get("/workout/new", (req, res) => {
  res.render("newworkout");
})

//Create

app.post("/workout", (req, res) => {
  req.body.workout.content = req.sanitize(req.body.workout.content);
  Workout.create(req.body.workout, (err, workout) => {
    if (err){ 
      console.log(err)
    } else {
      res.redirect("/workout");
    }
  });
});

//Show

app.get("/workout/:id", (req, res) => {
  Workout.findById(req.params.id, (err, foundWorkout) => {
    if (err) {
      console.log(err)
    } else {
      res.render("showworkout", {workout: foundWorkout});
    }
  });
});

//Edit

app.get("/workout/:id/edit", (req, res) => {
  Workout.findById(req.params.id, (err, foundWorkout) => {
    if (err) {
      console.log(err);
    } else {
      res.render("editworkout", {workout: foundWorkout});
    }
  });
});

//Update

app.put("/workout/:id", (req, res) => {
  req.body.workout.content = req.sanitize(req.body.workout.content);
  Workout.findByIdAndUpdate(req.params.id, req.body.workout, (err, foundWorkout) => {
    if (err) {
      console.log(err);
    } else { 
      res.redirect("/workout/" + req.params.id);
    }
  });
});

//Delete

app.delete("/workout/:id", (req, res) => {
  Workout.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/workout");
    }
  });
});


// ********************************************* //
//Server Config
// ********************************************* //

app.listen(port, ()=> console.log("Server has started."));