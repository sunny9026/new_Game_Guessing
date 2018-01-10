const User = require('../models/user');
const config = require('../config');
const jwt = require('jwt-simple');

//issuing token to user
function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}


exports.signin = function(req, res, next){
    res.send({token: tokenForUser(req.user)});
}

exports.signup = function(req, res, next){
    const Email = req.body.email;
    const password = req.body.password;

    if(!Email || !password){
        res.status(422).send({error: 'You must provide and email and password both.!!'})
    }

    User.findOne({email : Email}, function(err, existingUser){
        if(err){
            return next(err);
        }

        //if user already exists
        if(existingUser){
            res.status(422);
            res.json({error: "User already exist"});
        }

        //if user doesnot exist save this user in db
        const user = new User({
            email : Email,
            password : password
        });


        //saving the user in db
        user.save(function(err){
            if(err){
                return next(err);
            }

            //send json response back
            res.json({token: tokenForUser(user)});
        });
    });
}