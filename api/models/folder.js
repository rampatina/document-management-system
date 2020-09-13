var mongoose = require( 'mongoose' );

var folderSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  created: { 
    type: Date, 
    default: Date.now 
  },
  userid: {
    type: String
  }
});

mongoose.model('Folder', folderSchema);