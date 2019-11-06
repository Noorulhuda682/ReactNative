const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const AllRobbedSchema = new Schema({
     name : String,
     email : {  type : String, required : true, },
     password : { type : String, required : true  },
     userImg:String,
     address : String,
     age : Number,
     friendsIds : Array,
     token : String, 
     DeviceInfo : Object,
     lat : Number,
     long : Number,
     crimeType:String,
     crimeTime : Object, 
     img1:String,
     img2:String,
     img3:String,
     // For Blood Assignment
     id:String,
     bloodGroup:String,
     units:String,
     urgency:String,
     country:String,
     state:String,
     city:String,
     hospital:String,
     patientRelation:String,
     contact:String,
     addInstruction:String,
     volunteers:Array,
     comments:Array,
     userId:String,
     requirements:String

})


const AllPosts = mongoose.model('AllPosts',AllRobbedSchema);


module.exports = AllPosts;