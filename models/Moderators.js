 const mongoose     = require('mongoose');
 const Schema       = mongoose.Schema;
 const bcrypt       = require('bcrypt-nodejs');
 const validate     = require('mongoose-validator');

 var emailValidator = [

        validate({
            validator: 'isEmail',
            message: 'Enter a Valid Email'
        }),

        validate({
            validator : 'isLength',
            arguments: [3,35],
            message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
        })

 ];

  var passwordValidator = [

        validate({
            validator: 'isLength',
            arguments: [3,20],
            message: 'Password should be between {ARGS[0]} to {ARGS[1]} characters'
        })

 ];

 var usernameValidator = [

        validate({
            validator: 'isAlphanumeric',
            message: 'Username can only contain Letters and Numbers only'
        }),
        validate({
            validator: 'isLength',
            arguments: [3,10],
            message: 'Username should be between {ARGS[0]} to {ARGS[1]} characters'
        })

 ];

 const ModeratorsSchema = new Schema({

    username: { type: String, uppercase: true, trim: true, required: true, unique: true, validate: usernameValidator},
    email:    { type: String, lowercase: true, trim: true, required: true, unique: true, validate: emailValidator},
    mobile:    { type: Number,  trim: true, unique: true,},
    password:    { type: String,  trim: true, required: true, validate: passwordValidator},
      regDate:   {type: Date, default: Date.now},
      regDateFormat:   {type: String, trim:true},
      country:   {type: String, trim:true},
      name:   {type: String, trim:true},
      online:   {type: Boolean, default:false},
      hastraded:   {type: Array},
      successfulTrades:   {type: Number,trim:true, default:0},
      isVerified:   {type: Boolean, default:false},
      isEmailVerified:   {type: Boolean, default:false},
      isMobileVerified:   {type: Boolean, default:false},
      // socketId:   {type: String, trime:true,unique: true,},
      lastSeen:   {type: Date, default: Date.now}

 });

     ModeratorsSchema.pre('save', function(next){
            var user = this;
            bcrypt.hash(user.password, '', '', function(err,hash){
                if(err) return next(err);
                    if(user.password){
                        user.password = hash;
                    }

                next();
            })
     });

     ModeratorsSchema.methods.comparePassword = function(password){
        return bcrypt.compareSync(password, this.password);
     };

 module.exports = mongoose.model('Moderator', ModeratorsSchema); 