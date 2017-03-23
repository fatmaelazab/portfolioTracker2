var express = require('express');
var router = express.Router();

var passport= require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Student = require('../models/students');
var multer=require('multer');
var upload=multer({dest: 'uploads/' })
// Get Register Page
router.get('/register',function(req, res){
	res.render('register');
});

// Get Login Page
router.get('/login',function(req, res){
	res.render('login');
});

router.get('/profile',function(req,res) {
	res.render('profile');
});
router.post('/profile',upload.any(),function(req,res) {
	let student=new Student(req.body);
	if(req.files){
		 req.files.forEach(function(file){
		student.image="uploads"+file.filename;
			 console.log('imaaaaggeee');
		 })
	 }
});
// Post Students Registration
router.post('/register',upload.any(),function(req, res){
   var firstName= req.body.firstName;
	 var lastName= req.body.lastName;
	 var email= req.body.email;
	 var username= req.body.username;
	 var password= req.body.password;
	 var password2= req.body.password2;
	 var image =req.body.pic;
	 if(req.files){
		 req.files.forEach(function(file){
			image="uploads"+file.filename;
			 console.log('imaaaaggeee');
		 })
	 }
	 //Validation
 req.checkBody('firstName','First Name is Required').notEmpty();
 req.checkBody('lastName','Last Name is Required').notEmpty();
 req.checkBody('email','Email is Required').isEmail();
 req.checkBody('username','Username is Required').notEmpty();
 req.checkBody('password','Password is Required').notEmpty();
 req.checkBody('password2','Confirmation Password is Required').notEmpty();
 req.checkBody('password2','Passwords do not match').equals(req.body.password);


 var errors = req.validationErrors();

 if(errors){
	  res.render('register',{
			errors: errors
		});

 }else{
    var newStudent = new Student({
			firstName: firstName,
			lastName: lastName,
			email: email,
			username: username,
			password: password,
			image: image
		});

		Student.createStudent(newStudent,function(err,students){
			if(err) throw err;
			console.log(students);
		});
		req.flash('success_msg','Welcome, You can now login');
		res.redirect('/students/login');
 }

});
/*function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}
*/

passport.use(new LocalStrategy(
  function(username,password, done) {
   Student.getStudentByUsername(username,function(err,students){
		 if(err) throw err;
		 	if(!students){
				return done(null,false,{message: 'Unkown Username'});
			}
			Student.comparePassword(password,students.password,function(err,isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null,students);
				}
				else{
					return done(null,false,{message:'Invalid password'});
				}
			});
	 });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Student.getStudentById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local',{succesRedirect:'/',failureRedirect:'/students/login',
failureFlash: true}),
	function(req, res) {
				//let username = req.user.username;
		//console.log(req.user.username);
    res.redirect('/students/profile');
  });

router.get('/logout',function(req,res){
  req.logout();

	req.flash('success_msg','You are logged out');

	res.redirect('/students/login');
});

module.exports = router;
