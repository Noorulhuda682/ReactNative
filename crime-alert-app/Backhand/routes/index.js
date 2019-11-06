const express = require('express')
const app = express();
const router =  express.Router();

router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})




router.post('/',(req,res)=>{
    let user = req;
    let password = req.body.password;
    console.log('user',user,' password',password)
    res.end('yes')
})

router.use('/users' , require('./users.js') )
router.use('/posts' , require('./posts.js') )

module.exports = router;