var mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var docSchema = new mongoose.Schema({
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
    type: ObjectId
  }
});

mongoose.model('Document', docSchema);