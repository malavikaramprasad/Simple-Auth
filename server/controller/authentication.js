const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

//  subject - sub is a particular user
//  iat - issued at time
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat:timestamp}, config.secret);
}

exports.signup = function(req,res,next){
    const {email, password} = req.body;
    // see if user with given email exists
    if(!email || !password){
        return res.status(422).send({error:'Must provide email and password'});
    }
    User.findOne({email}, function(err, existingUser){
        if(err) {return next(err)}
        
        // if user with email exists, return error
        if(existingUser){
            return res.status(422).send({error:'Email is in use'})
        }
        
        //if NOT exist, create and save user
        const user = new User({ email, password});
        user.save(function(err){
            if(err) {return next(err)}

        //respond to request indicating the user was created    
            res.json({token: tokenForUser(user)})
        })

    }) 
}

exports.signin = function (req, res, next) {
    // User has the email and password authenticated,
    // need to return a token
    res.send({token: tokenForUser(req.user)});
}
