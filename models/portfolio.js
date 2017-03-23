var mongoose = require('mongoose');

var portfolioSchema = mongoose.Schema({
    name:{
        type:String,
    },
    title:{
      type: String},

    username: {
      type:  String},

    image: { type: String
    },
    summary:{
      type: String
    }
 })

var Portfolio = mongoose.model("portfolios", portfolioSchema);

module.exports = Portfolio;
