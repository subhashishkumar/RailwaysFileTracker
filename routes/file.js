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

module.exports = router;

