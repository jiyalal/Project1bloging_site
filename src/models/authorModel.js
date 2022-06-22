const mongoose = require('mongoose');
const validator = require('validator');

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

    email: {
       
        type:String,
        required : true,
        unique : true,
        // trim: true,
        // validate:{
        // validator: validator.isEmail,
        // message: '{VALUE} is not a valid email',
        // }

    },
    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})




module.exports = mongoose.model('author', authorSchema)