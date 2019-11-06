const jwt = require('jsonwebtoken');
const Users = require('../models/users')

const verifyToken = function(req,res,next){

console.log('req.headers===>',req.headers)
const token = req.headers.authorization;

 if(token){
    token.replace('Bearer ','')
    jwt.verify(token,'noorul15', async (err, decode) => {
        if(err){
            res.send({message:'Invalid Authorization'})
        }
        else{
            console.log('decode ===>', decode);
            const tokenExist = await Users.findOne({_id: decode._id, token});
            if(tokenExist) {
                next();
            } else {
                res.send({message: 'Invalid Authorization'})
            }
        }
    })
 }
 else{
     res.send({message: 'Invalid Authorization'})
 }
}

module.exports = verifyToken;