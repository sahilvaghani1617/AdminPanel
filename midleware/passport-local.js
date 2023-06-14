const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const usermodel = require('../model/adminmodel');

passport.use(new passportLocal({
    usernameField : "email"
},function(email,password,done){
    usermodel.findOne({email : email}, function(err,user){
        if(err){
            console.log("somthng wrong");
            return done(null,err);
        }

        if(!user || user.password != password){
            console.log("invalid password");
            return done(null,false);
        }
        return done(null,user);
    })
}))


passport.serializeUser(function(user,done){
    return done(null,user.id);
})

passport.deserializeUser(function(id,done){
    usermodel.findById(id, function(err,user){
        if(err){
            console.log("record not found");
            return done(null,err);
        }
        return done(null,user);
    })
})


passport.checkauth = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}

passport.setauthuser = function(req,res,next){
    if (req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;