var mongoose=require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);

var FileSchema=mongoose.Schema({
  name : {type:String },
  type :{type:String},
  createdOn:{type:String },
  createdBy:{type:String},
  details:{type:String},
  movement:[{from:String,to:String,movedOn:String,remark:String}]
});

FileSchema.plugin(autoIncrement, {inc_field: 'fileId'});

var File = module.exports = mongoose.model('File', FileSchema);
