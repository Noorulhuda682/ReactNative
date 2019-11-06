const express = require('express')
const router =  express.Router()
const Users = require('../models/users')
const verifyToken = require('../middleware/verifyToken');




router.get('/test',  (req, res) => {    
    res.send({mess:'working your backhand and ok safasdasd'})
})

router.post('/login', async (req, res) => {
    const userInfo = req.body;
    //check email
    const user = await Users.findOne({email: userInfo.email});
  console.log('Usersss***',user)

    if(!user) {
        res.send({message: "Invalid email or password!1"});
    }
    //check password
    const matchPassword =  user.comparePassword(userInfo.password);
    console.log('******',matchPassword);
    if(!matchPassword) {
        res.send({message: "Invalid email or password!2"});
    }

    await user.generateToken();
    res.send({_id: user._id, email: user.email, token: user.token, img:user.img, name: user.name,pushToken:user.pushToken,bloodGroup:user.bloodGroup});

})

router.post('/getAllPushTokens', async (req,res) => {
     const userInfo = req.body;
     const user = Users.find({  email:{$ne: userInfo.email }  })
     console.log('allUserNTME',user);

     user.then((allUsers) => {
        res.send({result: allUsers})
    }).catch(e => {
        res.send({message: e.message});
    })
});

router.post('/addPushToken', async (req,res) => {
     const userInfo = req.body;
     const user = await Users.findOne({email:userInfo.email})

     user.pushToken = userInfo.pushToken;

    await  user.save()

    res.send({message:`push token added successfully into ${user.name}'s account`})
});




router.post('/updateLoc', async (req, res) => {
    const userInfo = req.body;
    //check email
    const user = await Users.findOne({email: userInfo.email})
  console.log('Usersss***',user)

  user.lat =  userInfo.lat;
  user.long = userInfo.long;
    await user.save()
    res.send({_id: user._id, email: user.email, token: user.token,lat:user.lat,long:user.long});
})

router.post('/getUser', (req, res) => {
    //req.params.id
    const email = req.body.email;
    const password = req.body.password; 

    // const users = Users.find({ email });
   const users = Users.find({password})

    users.then((allUsers) => {
        res.send({result: allUsers})
    }).catch(e => {
        res.send({message: e.message});
    })
})



router.post('/addUser', (req,res)=>{
    const user = req.body;
    const newUser = new Users(user);
    
    newUser.save()
    .then( () =>{
        res.send({message:'user added Successfully',user:user})
    }).catch( e =>{
        console.log('Error ===>',e)
        res.send({message : e.message})
    })

})

module.exports = router;