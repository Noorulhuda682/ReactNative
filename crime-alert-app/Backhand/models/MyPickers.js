const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const MyPickers = new Schema({
     name : String,
     email : {
          type : String,
          required : true,
     },
     password : {
        type:String,
        required : true 
     },
     address : String,
     age : Number,
     friendsIds : Array,
     token : String, 
     lat : Number,
     long : Number,
})


const pickers = mongoose.model('pickers',MyPickers);

module.exports = pickers;