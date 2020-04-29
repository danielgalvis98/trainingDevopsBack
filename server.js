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
//Get movies from db
function getMovies(callback) {    
  connection.query("SELECT title, `release`, score, reviewer, publication FROM movie_db.moviereview WHERE pending = false",
    function (err, rows) {
      callback(err, rows); 
    }
  );
}
//Get pending movies from db
function getPendingMovies(callback) {    
  connection.query("SELECT title, `release`, score, reviewer, publication FROM movie_db.moviereview WHERE pending = true",
    function (err, rows) {
      callback(err, rows); 
    }
  );
}
//Get reviewers from db
function getReviewers(callback) {    
  connection.query("SELECT * FROM movie_db.reviewer",
    function (err, rows) {
      callback(err, rows); 
    }
  );
}
//Get publication from db
function getPublication(callback) {    
  connection.query("SELECT * FROM movie_db.publication",
    function (err, rows) {
      callback(err, rows); 
    }
  );
}
//Enpoint
app.get('/', function(req, res, next) {
    //now you can call the get-driver, passing a callback function
   getMovies(function (err, moviesResult){ 
      // you might want to do something is err is not null...      
      res.json(moviesResult);

   });
});
//Endpoint reviewers
app.get('/reviewers', function(req, res, next) {
  //now you can call the get-driver, passing a callback function
  getReviewers(function (err, moviesResult){ 
    // you might want to do something is err is not null...      
    res.json(moviesResult);

 });
});
//Endpoint Publications
app.get('/publications', function(req, res, next) {
  //now you can call the get-driver, passing a callback function
  getPublication(function (err, moviesResult){ 
    // you might want to do something is err is not null...      
    res.json(moviesResult);

 });
});
// Implement the movies API endpoint
app.get('/movies', function(req, res){
  console.log("Access to movie endpoitn");
  //now you can call the get-driver, passing a callback function
  getMovies(function (err, moviesResult){ 
    // you might want to do something is err is not null...      
    res.json(moviesResult);

  });
})
// Implement the pending reviews API endpoint
app.get('/pending', function(req, res){
  //now you can call the get-driver, passing a callback function
  getPendingMovies(function (err, moviesResult){ 
    // you might want to do something is err is not null...      
    res.json(moviesResult);

  });
})
console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT);
console.log("App deployed 6");
module.exports = app;