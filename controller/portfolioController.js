var Portfolio = require('../models/portfolio');

var multer=require('multer');
var upload=multer({dest: 'uploads/' })

var portfolioController = {

    getAllPortfolios:function(req, res){

        Portfolio.find(function(err, portfolios){

            if(err)
                res.send(err.message);
            else
                res.render('guest', {portfolios});
        })
    },

    createPortfolio:function(req, res){
        var portfolio = new Portfolio(req.body);
        portfolio.name=req.body.name;
        //portfolio.username=req.body.username;
        portfolio.title=req.body.title;
        portfolio.image=req.body.userFile;
         if(req.files){
     req.files.forEach(function(file){
       portfolio.image="uploads/"+file.filename;
     })
   }

        portfolio.save(function(err, portfolio){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
               req.flash('success_msg','Your Portfolio is created successfully!');
                console.log(portfolio);
                res.redirect('/portfolios');

          }
        })
    },
    getPortfolioByUsername: function(req, res){

      Portfolio.find({username: req.user.username},function(err,Portfolios){
        if(err)
          res.send(err.message)
          else{

            res.render('user',{userportfolios: portfolios});
          }
      }

)}
}
module.exports = portfolioController;
