const express = require('express');
const router = express.Router();

const File = require('../models/file');
const Department = require('../models/department');

router.post('/add',ensureAuthenticated,(req,res)=>{
	//console.log(req.body);
	var newFile = File();
	newFile.name = req.body.name;
	newFile.type = req.body.type;
	newFile.details = req.body.details;
	newFile.createdBy = req.body.createdBy;
	newFile.createdOn = req.body.createdOn;
	newFile.save();
	res.redirect('/user/home');
})

router.get('/delete/:fileId',ensureAuthenticated,(req,res)=>{
	File.remove({_id:req.params.fileId},(err)=>{
		if(err)
      		throw err;
    	req.flash('success_msg', 'File Succesfully Deleted');
    	res.redirect('/user/home');
	});
})

router.get('/edit/:fileId',ensureAuthenticated,(req,res)=>{
	File.findOne({_id:req.params.fileId},(err,file)=>{
		if(err) throw err;
		Department.find({},(err,departments)=>{
			if(err) throw err;
			res.render('file',{movement:file.movement,file:file,departments:departments});
		})		
	});
})

router.post('/update/:fileId',ensureAuthenticated,(req,res)=>{
	File.findOneAndUpdate(
		{_id:req.params.fileId},
		{$push:{movement:{from:req.body.from,to:req.body.to,movedOn:req.body.movedOn,remark:req.body.remark}}},
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

