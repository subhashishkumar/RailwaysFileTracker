var mongoose=require('mongoose');

var FileSchema=mongoose.Schema({
  name : {type:String },
  fileId:{type:String },
  createdOn:{type:String },
  createdBy:{type:String},
  details:{type:String},
  movement:[{from:String,to:String,movedOn:String}]
});

var File = module.exports = mongoose.model('File', FileSchema);
