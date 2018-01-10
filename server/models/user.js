const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Defining our model

const userSchema = new Schema({
    email : {type:String, unique:true, lowercase:true},
    password : String
});

//creating inside method of userSchema to be used for comparing the encrypted password stored
userSchema.methods.comparePassword = function(candidatePassword, callback){

    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){ return callback(err); }
        callback(null, isMatch);
    });
}

// on save hook encrypting password
userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, function(err, salt){
        if(err){return next(err);}

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){return next(err);}

            user.password = hash;
            next();
        });
    });
});

//create the model class

const modelClass = mongoose.model('user',userSchema);

//export the model

module.exports = modelClass;