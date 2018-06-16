var mongoose=require('mongoose');

var FileSchema=mongoose.Schema({
  name : {type:String },
  fileId:{type:String },
  createdOn:{type:String },
  createdBy:{type:String},
  details:{type:String},
});

var File = module.exports = mongoose.model('File', FileSchema);
