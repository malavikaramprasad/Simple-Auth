const auth = require('./controller/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// session false ( for cookie based) as we sare using token based strategy. 
const reqAuth = passport.authenticate('jwt', {session:false});
const reqSignin = passport.authenticate('local', {session:false})

module.exports = function(app){
    app.get('/', reqAuth, function(req,res){
        res.send({hi:"Welcome"});
    })
    app.post('/signin', reqSignin, auth.signin);
    app.post('/signup', auth.signup);
}