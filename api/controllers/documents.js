var mongoose = require('mongoose');
var Document = mongoose.model('Document');

module.exports.documentsRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private documents"
    });
  } else {
    Document
      .findById(req.payload._id)
      .exec(function(err, document) {
        res.status(200).json(document);
      });
  }

};
