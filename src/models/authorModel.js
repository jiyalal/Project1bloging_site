const mongoose = require('mongoose');
const validator = require('validator');
// var uniqueValidator = require('mongoose-unique-validator');

const authorSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: true
    },
    // email : {
    //     type : String, 
    //     required : true,
    //     unique : true,
    //     lowercase : true,
    //     trim:true,
    //     validate : {
    //         validator: function(email){
    //             return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
    //         }, message:'Email is invalid, Please check your Email address.', isAsync:false
    //     }
    // },
    // email: { type: String, index: true, unique: true, required: true },
    email: {
       
        type:String,
        required : true,
        unique : true,
        lowercase : true,
        validate:{
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
        }
    //     // type: String,
    //     // unique: true,
    //     // required: true

    },
    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})




// var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');

// // Define your schema as normal.
// var userSchema = mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, index: true, unique: true, required: true },
//     password: { type: String, required: true }
// });

// Apply the uniqueValidator plugin to userSchema.
// authorSchema.plugin(uniqueValidator);




module.exports = mongoose.model('author', authorSchema)