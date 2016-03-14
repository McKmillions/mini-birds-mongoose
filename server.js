  var   express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    port = 8091,
    mongoUri = 'mongodb://localhost:27017/',
    Sighting = require('./Sighting');

  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static(__dirname + '/public'));

  app.get('/api/sightings', function(req, res) {
    console.log(req.query);
    Sighting.find(req.query).exec().then(function(results) {
     return res.send(results);
   }, function(err) {
     console.log(err);
     return res.status(500).json(err);
   });
  });

  app.get('/api/sightings/:id', function(req, res) {
    Sighting.findOne({_id:req.params.id}).exec().then(function(result) {
        return res.send(result);
    }, function(err) {
      console.log(err);
      return res.status(500).json(err);
    });
  });

  app.post('/api/sightings', function(req, res) {
    var newSighting = new Sighting(req.body);
    // console.log(111, req.body);
    newSighting.save().then(function(results) {
      return res.status(201).end();
    }, function(err) {
      console.log(err);
      return res.status(500).json(err);
    });
  });

  app.put('/api/sightings/:id', function(req, res) {
    // console.log(1111, req.body)
    Sighting.update({_id: req.params.id}, {$set:req.body}, {runValidators: true}).then(function(result) {
      // console.log(result);
      return res.status(200).end();
    }, function(err) {
      console.log(err);
      return res.status(500).json(err);
    });
  });

  app.delete('/api/sightings/:id', function(req, res) {
    Sighting.remove({_id: req.params.id}).then(function() {
      return res.status(200).end();
    }, function(err) {
      console.log(err);
      return res.status(500).json(err);
    });
  });

  mongoose.connect(mongoUri);
  mongoose.connection.once('open', function() {
      console.log('Connected to MongoDB at ' + mongoUri);
  });

  app.get('/', function(req, res){
    res.send("Hello");
  });


  app.listen(port, function() {
      console.log('Listening on ' + port);
  });
