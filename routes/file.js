const express = require('express');
const router = express.Router();

const File = require('../models/file');

router.post('/add',(req,res)=>{
	//console.log(req.body);
	var newFile = File();
	newFile.name = req.body.name;
	newFile.fileId = req.body.fileId;
	newFile.details = req.body.details;
	newFile.createdBy = req.body.createdBy;
	newFile.createdOn = req.body.createdOn;
	newFile.save();
	res.redirect('/');
})

router.get('/delete/:fileId',(req,res)=>{
	File.remove({_id:req.params.fileId},(err)=>{
		if(err)
      		throw err;
    	req.flash('success_msg', 'File Succesfully Deleted');
    	res.redirect('/');
	});
})

router.get('/edit/:fileId',ensureAuthenticated,(req,res)=>{
	File.findOne({_id:req.params.fileId},(err,file)=>{
		if(err)
      		throw err;
      	//console.log(file);
      	//console.log(file.movement);
      	res.render('file',{movement:file.movement,file:file});
	});
})

router.post('/update/:fileId',(req,res)=>{
	File.findOneAndUpdate(
		{_id:req.params.fileId},
		{$push:{movement:{from:req.body.from,to:req.body.to,movedOn:req.body.movedOn}}},
		(err,file)=>{
			if(err)
				throw(err);
			else
				res.redirect(`/file/edit/${req.params.fileId}`)
		});
})

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/user/login');
  }
}

module.exports = router;

