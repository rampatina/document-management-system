var mongoose = require('mongoose');
var Document = mongoose.model('Document');

module.exports.documentsRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private documents"
    });
  } else {
    Document
      .find({userid: req.payload._id})
      .exec(function(err, document) {
        res.status(200).json(document);
      });
  }

};

module.exports.getFilesInFolder = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private documents"
    });
  } else {
    Document
      .find({folderid: req.params.folderid})
      .exec(function(err, document) {
        if (err) {
          console.log('problen in retrieving docs');
        }
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
    var newDoc = new Document({name: req.body.name, content: req.body.content, folderid: req.body.folderid, userid:req.body.userid });
    newDoc
      .save()
      .exec(function(err, document) {
        if (err) {
          console.log('problen in insert');
        }
        res.status(200).json(document);
      });
  }

};

module.exports.moveDocument = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private documents"
    });
  } else {
    Document
      .update({_id:req.body.fileid}, {folderid:req.body.targetfoldeid, userid:''})
      .exec(function(err, document) {
        if (err) {
          console.log('problen in insert');
        }
        res.status(200).json(document);
      });
  }

};
