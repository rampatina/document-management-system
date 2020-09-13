var mongoose = require('mongoose');
var Folder = mongoose.model('Folder');

module.exports.foldersRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private documents"
    });
  } else {
    console.log('payload id folder ' + req.payload._id);
    Folder
      .find({userid: req.payload._id})
      .exec(function(err, document) {
        res.status(200).json(document);
      });
  }

};

module.exports.folderAdd = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private documents"
    });
  } else {
    console.log('payload is ', req.body);
    var newDoc = new Folder({name: req.body.name, userid:req.body.userid });
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
