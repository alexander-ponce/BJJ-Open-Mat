const mongoose = require('mongoose')
// const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({

  first: {
    type: String,
    required: true,
    minLength: [2, 'Must be at least 2 characters']
  },
  last: {
    type: String,
    required: true,
    minLength: [2, 'Must be at least 2 characters']
  },
  beltColor: {
    type: String,
    required: true,
    enum : ["White", "Blue", "Purple", "Brown", "Black" ]
  },
  email: {
    type: String,
    required: true,
    minLength: [8, 'Must be at least 8 characters']
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'Must be at least 8 characters']
  }
}, {timestamps: true} );

// MongoDB schema provides virtual
// short term value
UserSchema.virtual('confirmP')
    .get(function() { return this._confirmP; })
    .set(function(e) { this._confirmP = e; });
// UserSchema.virtual('confirmP')
//     .get( () => this._confirmP )
//     .set( e => this._confirmP = e );
// pre or post middlewear
UserSchema.pre('validate', function(next){
    if (this.password !== this.confirmP) {
        this.invalidate('confirmP', 'Passwords must match💜💜!!')
    }
    // otherwise call next middlewear
    // alwasy call next middlewear
    next()
})

// check confirm email
// UserSchema.virtual('confirmE')
//     .get( () => this._confirmE )
//     .set( e => this._confirmE = e);
UserSchema.virtual('confirmE')
    .get(function() { return this._confirmE; })
    .set(function(e) { this._confirmE = e; });
UserSchema.pre('validate', function(next){
    if (this.email !== this.confirmE) {
        this.invalidate('confirmE', 'Emails must match💜💜!!')
    }
    next()
})


// SAVE ENCRYPTED PASSWORD
UserSchema.pre('save', async function (next) {
    try {
        // hash the password, 10 times
        const hashedP = await bcrypt.hash(this.password, 10)
        // update password with hashed password
        this.password = hashedP
        next()
    } catch (err) {
        console.log('ERROR IN SAVE: ', err)
    }
})

module.exports = mongoose.model('User', UserSchema);



// MongoDB schema provides virtual
// short term value
// UserSchema.virtual('confirmP')
//     .get( () => this._confirmP )
//     .set( e => this._confirmP = e );
// // pre or post middlewear
// UserSchema.pre('validate', function(next){
//     if (this.password !== this.confirmP) {
//         this.invalidate('confirmP', 'Passwords must match💜💜!!')
//     }
//     // otherwise call next middlewear
//     // alwasy call next middlewear
//     next()
// })

// // check confirm email
// UserSchema.virtual('confirmE')
//     .get( () => this._confirmE )
//     .set( e => this._confirmE = e);
// UserSchema.pre('validate', function(next){
//     if (this.email !== this.confirmE) {
//         this.invalidate('confirmE', 'Emails must match!!')
//     }
//     next()
// })

// UserSchema.pre('save', async function (next) {
//     try {
//         // hash the password, 10 times
//         const hashedP = await bcrypt.hash(this.password, 10)
//         // update password with hashed password
//         this.password = hashedP
//         next()
//     } catch (err) {
//         console.log('ERROR IN SAVE: ', err)
//     }
// })

