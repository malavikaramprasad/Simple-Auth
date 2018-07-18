const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

// define User Model
const userSchema = new Schema({
    email: { 
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

// on save, hook brcypt logic
// before saving
userSchema.pre('save', function(next) {
    const user = this; // access to user model
    // generate salt then run callback
    bcrypt.genSalt(10, function (err,salt) {
        if(err) {return next(err);}

        //hash or encrypt the password using the salt and then run the callback
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) {return next(err);}

            // override plain password with encryoted password
            user.password = hash;

            // save the model
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) {return callback(err);}
        callback(null, isMatch);
    })
}
// Create model class
const ModelClass = mongoose.model('users', userSchema); 

// Export model
module.exports = ModelClass;