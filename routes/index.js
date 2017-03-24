var express = require('express');
var router = express.Router();

var projectController = require('../controller/projectController');
var Project = require('../models/project');
var portfolioController = require('../controller/portfolioController');
var multer=require('multer');
var upload=multer({dest: 'uploads/' })
var Student = require('../models/students');

router.post('/profile',upload.any(),function(req,res,next){
 var newStudent=new Student(req.body);
	if(req.files){
		req.files.forEach(function(file){
			newStudent.image="uploads/"+file.filename;
			console.log('uploooaaaadd');
		})
	}
  console.log('FIRST TEST: '+JSON.stringify(req.files))
})

router.get('/', function(req, res){
	res.render('welcome');
});
router.get('/createPortfolios', function(req, res){
  req.flash('error_msg','Please add at least one work');
	res.render('createPortfolios');
})


router.get('/user',projectController.getProjectByUsername1);

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/students/login');
	}
}

//add routes
router.get('/portfolios',projectController.getProjectByUsername);
router.get('/guestAll',projectController.getAllProjects1);
router.get('/guest',portfolioController.getAllPortfolios);
router.post('/portfolioUser',portfolioController.createPortfolio);
router.post('/project',upload.any(),projectController.createProject);

//router.get('/portfolio',projectController.getProjectByUsername1);
module.exports = router;
