// Get our dependencies
var express = require('express');
var app = express();
const dotenv = require('dotenv');
dotenv.config();
var mysql = require("mysql");
var connection = mysql.createConnection({
 host     : process.env.DB_HOST || 'mysql-test.cxrpknmq0hfi.us-west-2.rds.amazonaws.com',
 port     : process.env.DB_PORT || '3306',
 user     : process.env.DB_USER || 'applicationuser',
 password : process.env.DB_PASS || 'applicationpass',
 database : process.env.DB_NAME || 'movie_db'
});

connection.connect();

function getMovies(callback) {    
  connection.query("SELECT * FROM movie_db.publication",
    function (err, rows) {
      callback(err, rows); 
    }
  );
}

function getReviewers(callback) {    
  connection.query("SELECT * FROM movie_db.reviewer",
    function (err, rows) {
      callback(err, rows); 
    }
  );
}

function getPublication(callback) {    
  connection.query("SELECT * FROM movie_db.publication",
    function (err, rows) {
      callback(err, rows); 
    }
  );
}
//Testing endpoint
app.get('/', function(req, res, next) {
    //now you can call the get-driver, passing a callback function
   getMovies(function (err, moviesResult){ 
      // you might want to do something is err is not null...      
      res.json(moviesResult);

   });
});

app.get('/reviewers', function(req, res, next) {
  //now you can call the get-driver, passing a callback function
  getReviewers(function (err, moviesResult){ 
    // you might want to do something is err is not null...      
    res.json(moviesResult);

 });
});

app.get('/publications', function(req, res, next) {
  //now you can call the get-driver, passing a callback function
  getPublication(function (err, moviesResult){ 
    // you might want to do something is err is not null...      
    res.json(moviesResult);

 });
});

// Implement the movies API endpoint
app.get('/movies', function(req, res){
  var movies = [
    {title : 'Suicide Squad', release: '2016', score: 8, reviewer: 'Robert Smith', publication : 'The Daily Reviewer'},    
    {title : 'Batman vs. Superman', release : '2016', score: 6, reviewer: 'Chris Harris', publication : 'International Movie Critic'},
    {title : 'Captain America: Civil War', release: '2016', score: 9, reviewer: 'Janet Garcia', publication : 'MoviesNow'},
    {title : 'Deadpool', release: '2016', score: 9, reviewer: 'Andrew West', publication : 'MyNextReview'},
    {title : 'Avengers: Age of Ultron', release : '2015', score: 7, reviewer: 'Mindy Lee', publication: 'Movies n\' Games'},
    {title : 'Ant-Man', release: '2015', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
    {title : 'Guardians of the Galaxy', release : '2014', score: 10, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'},
  ]

  res.json(movies);
})

// Implement the pending reviews API endpoint
app.get('/pending', function(req, res){
  var pending = [
    {title : 'Superman: Homecoming', release: '2017', score: 10, reviewer: 'Chris Harris', publication: 'International Movie Critic'},
    {title : 'Wonder Woman', release: '2017', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
    {title : 'Doctor Strange', release : '2016', score: 7, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'}
  ]
  res.json(pending);
})
console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT);
module.exports = app;
