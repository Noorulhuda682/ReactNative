const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new Schema({
     name : String,
     email : {
          type : String,
          required : true,
     },
     password : {
        type:String,
        required : true 
     },
     img:String,
     address : String,
     age : Number,
     friendsIds : Array,
     token : String, 
     lat:Number,
     long:Number,
     DeviceInfo : Object,
     regTime:Object,
     pushToken:String,
     bloodGroup:String
})



// we can create our own methods static one and normal one 
UserSchema.methods.comparePassword = function (password) {
     const user = this;
     console.log('PASSWORDS',password, user.password)
     return bcryptjs.compareSync(password, user.password);
}



UserSchema.methods.generateToken = async function(){
   const user = this;
//    payload
// third one for expireIn:'2d'
   const token = jwt.sign({_id:user._id},"noorul15",{})
  console.log('token***',token)

   user.token = token;

   await user.save()
   return token;
}


UserSchema.methods.removeToken = async function (token) {
     const user = this;
 
     await user.findOneAndUpdate({token}, { token: null });
     return;
 }


UserSchema.pre("save", function (next) {
     const user = this;
 
     if (user.isModified('password')) {
         const salt = bcryptjs.genSaltSync(10);
         const hash = bcryptjs.hashSync(user.password, salt);
 
         user.password = hash;
     }
 
     next();
 })




const Users = mongoose.model('Users', UserSchema);

module.exports = Users;