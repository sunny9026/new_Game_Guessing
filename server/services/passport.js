const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//setting up options for JwtStrategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

//setting up options for local strategy
const localOptions = {
    usernameField: 'email'
}

//creating a local strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    User.findOne({email}, function(err, user){
        if(err){ return done(err, false); }
        if(!user){ return done(null, false); }
        //compare the user provided with the password saved in the database
        user.comparePassword(password, function(err, isMatch){
            if(err){ return done(err, false); }
            if(!isMatch){ return done(null, false); }
            return done(null, user);
        });
    });
});

//creating a jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    User.findById(payload.sub, function(err,user){
        if(err){return done(err, false);}

        if(user){done(null, true);}

        else{done(null, false);}
    });
});

//telling passport to use the above strategy always
passport.use(jwtLogin);
//telling passport to use the local strategy
passport.use(localLogin);