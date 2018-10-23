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

 const ElectionsSchema = new Schema({

    electionName: { type: String,  trim: true, required: true, unique: true},
    electionCreator:    { type: Schema.ObjectId, trim: true, required: true, ref:'Moderator'},
    availablePosts:    { type: Array,  trim: true, unique: true,},
    electionStartDate:    { type: Date,  trim: true, required: true, validate: passwordValidator},
      electionEndDate:   {type: Date, default: Date.now},
      candidates:   {type: Array},
      voters:   {type: Array},
      candidatesShouldReg:   {type: Boolean, default:false},
      candidatesShouldPay:   {type: Boolean, default:false},
      votersShouldReg:   {type: Boolean, default:false},
      country:   {type: String, trim:true}

 });



 module.exports = mongoose.model('Election', ElectionsSchema); 