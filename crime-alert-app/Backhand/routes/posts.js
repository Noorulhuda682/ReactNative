const express = require('express')
const router =  express.Router()
const pickers = require('../models/MyPickers')
const AllPosts = require('../models/AllRobbedHistory')
const verifyToken = require('../middleware/verifyToken');



router.get('/test',  (req, res) => {

    res.send({mess:'MyPosts and AllRobbedHistory backhand Code'})
})

router.get('/getAllPosts', (req, res) => {
    
   const posts = AllPosts.find();

    posts.then((allPosts) => {
        console.log('Posts***',allPosts)
        res.send({result: allPosts})
    }).catch(e => {
        res.send({message: e.message});
    })
})

router.post('/getMyPosts', (req, res) => {
   const userInfo = req.body;
   console.log('User***',userInfo)
   const posts = AllPosts.find({ email : userInfo.email});

    posts.then((allPosts) => {
        console.log('getMyPosts***',allPosts)
        res.send({result: allPosts})
    }).catch(e => {
        res.send({message: e.message});
    })
})

// UPDATE ONE DONATION IN NESTED ARRAY IN MONGOBO

router.post('/updateDonation', async  (req, res) => {
   const userInfo = req.body;
   console.log('User***',userInfo)

   var post = await AllPosts.updateOne({ _id : userInfo.id , "volunteers.email" : userInfo.email},
   {$set: {"volunteers.$.donation": "donated"}} );
     
   res.send({message:post})

})



router.post('/addVolunteer', async  (req, res) => {
   const userInfo = req.body;
   const id = req.body.id;
   console.log('Userasds***',id,userInfo)
   const posts = AllPosts.update({
    _id: id
    },{$push:{volunteers: userInfo }});


    posts.then((allPosts) => {
        // console.log('getMyPosts***',allPosts)
        res.send({result: allPosts})
    }).catch(e => {
        res.send({message: e.message});
    })
})

router.post('/comment', async  (req, res) => {
   const userInfo = req.body;
   const id = req.body.id;
//    console.log('Userasds***',id,userInfo)
   const posts = AllPosts.update({
    _id: id
    },{$push:{comments: userInfo }});

    
    posts.then((allPosts) => {
        console.log('getCommits***',allPosts)
        res.send({result: allPosts})
    }).catch(e => {
        res.send({message: e.message});
    })
})





router.post('/updateRequuirement', async (req, res) => {
    const userInfo = req.body;
    //check email
    const post = await AllPosts.findOne({_id: userInfo.id})
  console.log('Usersss***',post)

  post.requirements =  'Completed';

    await post.save()
    res.send({result:post});
})




router.post('/deletePost', (req,res)=>{
    const post = req.body;
     AllPosts.deleteMany({name:post.name})
     .then( e =>{
         res.send({message:'Post deleted Successfully',e})
        }).catch( err =>{
         res.send({message:err})
     })

})


router.get('/getAllPickers', (req, res) => {
    const posts = pickers.find(); 
     posts.then((allPosts) => {
         console.log('Posts***',allPosts)
         res.send({result: allPosts})
     }).catch(e => {
         res.send({message: e.message});
     })
 })
 



router.post('/addPosts', (req,res)=>{
    const post = req.body;
    const newPost = new AllPosts(post);
    
    newPost.save()
    .then( () =>{
        res.send({message:'Post added Successfully'})
    }).catch( e =>{
        console.log('Error ===>',e)
        res.send({message : e.message})
    })

})




module.exports = router;