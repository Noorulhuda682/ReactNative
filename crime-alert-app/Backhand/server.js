const express = require('express')
const app = express();
const bodyParser = require('body-parser');
let cors = require('cors')

const db = require('./db');

db.connection.once('open', () =>{
  console.log('db connected')
}).on('error', error =>{
    console.log('Error =>' , error)
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', require('./routes/index.js'))


const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`server is running...${port}`))

// authentication is must so that the user can access protect routes 
//for authentication  $ npm i jsonwetoken

