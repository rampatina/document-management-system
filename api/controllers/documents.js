var mongoose = require('mongoose');
var Document = mongoose.model('Document');

module.exports.documentsRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private documents"
    });
  } else {
    console.log('payload id ' + req.payload._id);
    Document
      .find({userid: req.payload._id})
      .exec(function(err, document) {
        res.status(200).json(document);
      });
  }

};

module.exports.documentAdd = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private documents"
    });
  } else {
    console.log('payload is ', req.body);
    var newDoc = new Document({name: req.body.name, content: req.body.content, folderid: req.body.folderid, userid:req.body.userid });
    newDoc
      .save()
      .exec(function(err, document) {
        if (err) {
          console.log('problen in insert');
        }
        console.log('Reached exec');
        res.status(200).json(document);
      });
  }

};

/*module.exports.moveDocument = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private documents"
    });
  } else {
    console.log('payload is ', req.body);
    var newDoc = new Document({name: req.body.name, content: req.body.content, folderid: req.body.folderid});
    newDoc
      .save()
      .exec(function(err, document) {
        if (err) {
          console.log('problen in insert');
        }
        console.log('Reached exec');
        res.status(200).json(document);
      });
  }

};*/
