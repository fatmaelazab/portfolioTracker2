var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



//Student Schema
var studentSchema = mongoose.Schema({
  firstName: {
    type: String,
    index: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  image:{
    type:String
  }
});

var Student = module.exports = mongoose.model('students',studentSchema);

module.exports.createStudent= function(newStudent,callback){
  bcrypt.genSalt(10, function(err, salt) {
   bcrypt.hash(newStudent.password, salt, function(err, hash) {
       newStudent.password=hash;
       newStudent.save(callback);
   });
});
}

module.exports.getStudentByUsername = function(username,callback){
  var query = {username: username};
  Student.findOne(query,callback);

}

module.exports.comparePassword = function(candidatePassword,hash,callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null,isMatch);
});
}

module.exports.getStudentById = function(id,callback){
	Student.findById(id, callback);
}
