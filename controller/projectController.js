var Project = require('../models/project');

var multer=require('multer');
var upload=multer({dest: 'uploads/' })

var projectController = {

    getAllProjects:function(req, res){

        Project.find(function(err, projects){

            if(err)
                res.send(err.message);
            else
                res.render('guest', {projects});
        })
    },

    createProject:function(req, res){
        var project = new Project(req.body);
        //req.flash('error_msg','Please Add at least one project');
        upload.any();
        // console.log('llllllllllllllllllllllllllllllllll');
          project.image=req.body.pic;
         if(req.files){
     req.files.forEach(function(file){
       project.image="uploads/"+file.filename;
     })
   }
   /*
         if(!Projects.length){
           console.log('hhhhhh');
           req.flash('success_msg','Your Portfolio is created successfully!');
         }
         */
        project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
               req.flash('success_msg','Your Portfolio is created successfully!');
                console.log(project);
                res.redirect('/portfolios');

          }
        })
    },
    getProjectByUsername: function(req, res){
   req.flash('error_msg','Please Add at least one project');
      Project.find({username: req.user.username},function(err,projects){
        if(err)
          res.send(err.message)
          else{

            res.render('index',{userprojects: projects});

          }
      }

)},
getProjectByUsername1: function(req, res){
//req.flash('error_msg','Please Add at least one project');
  Project.find({username: req.body.username},function(err,projects){
    if(err)
      res.send(err.message)
      else{

        res.render('user',{userprojects: projects});
      }
  }

)},

    getAllProjects1:function(req, res){

        Project.find(function(err, projects){

            if(err)
                res.send(err.message);
            else
                res.render('guestAll', {projects});
        })
    }
}
module.exports = projectController;
