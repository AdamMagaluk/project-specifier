
var mongo = require('mongodb');
var url = require('url');
var log = console.log;

var Server = mongo.Server,
    Db = mongo.Db;

var uri = 'mongodb://testdb:testdb@alex.mongohq.com:10036/project-specifier';
var db = Db.connect(uri, function(error, client) {
  if (error) throw error;
  else console.log("Connected to "+uri)
});

