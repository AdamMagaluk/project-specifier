var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('exampleDb', server);

db.open(function(err, db) {
  if(!err) {
    db.collection('test', function(err, collection) {
      var doc1 = {'hello':'doc1'};
      var doc2 = {'hello':'doc2'};
      var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];
      collection.insert(doc1);
      collection.insert(doc2, {safe:true}, function(err, result) {});
      collection.insert(lotsOfDocs, {safe:true}, function(err, result) {});
    });
  }
});