var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    URL:{
      type: String},

    username: {
      type:  String},

    image: { type: String
    }
 })

var Project = mongoose.model("project", projectSchema);

module.exports = Project;
