import * as firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyA_i1QXnXKethdPeEfbxcNsUOWtMIqiHm4",
    authDomain: "rn-messanger.firebaseapp.com",
    databaseURL: "https://rn-messanger.firebaseio.com",
    projectId: "rn-messanger",
    storageBucket: "",
    messagingSenderId: "41015157790",
    appId: "1:41015157790:web:70942c0f1bf80241"
  };


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


function createUsers(name,email,password){
    // const {name,email,password} = this.state;
    console.log('onetwo',name,email,password)

    var userObj = {
      name ,
      email ,
      password
    }
    console.log('onetwo',userObj)
    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                userObj.myUid = firebase.auth().currentUser.uid
              db.collection('USERS').add(userObj).then(() =>{
                  alert('Account creation is successful')
                })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Error",errorMessage,errorCode);
            });

               
  }





function getAllUsers(){
    return new Promise( (resolve,reject) =>{
        db.collection('USERS').get().then( docs =>{
            const arr = [];

            docs.forEach( res =>{
                // console.log('res ===>', res.data())
                
                const obj = {id : res.id, ...res.data()}
                // console.log('obj ******',obj)
                arr.push(obj)
            })
            resolve(arr);
        })
    })
}

function checkAndCreateRoom(friendid,currentUser){
    // console.log('ChatUserId*****',friendid,currentUser);
 return new Promise( (resolve,reject) =>{
     const USERS = {[friendid]:true,[currentUser]:true}

    db.collection('chatrooms').where(`USERS.${friendid}`,'==',true).where(`USERS.${currentUser}`,'==',true)
     .get().then( docs =>{
         let room = {};
         docs.forEach( snapshot =>{
            // console.log('Snapshot*****',snapshot);
            room = snapshot.data();
            room.id = snapshot.id;
         })
         
         if(!room.id){
          room = {USERS, createdAt:Date.now() , lastMessage: {}}
          db.collection('chatrooms').add(room).then( res =>{
              room.id = res.id;
              resolve(room);
          })
         }
         else{
            resolve(room);
         }
     })
 })
}


function getRoomInformation(roomId){
     return new Promise( (resolve , reject) => {
         db.collection('chatrooms').doc(roomId).get().then( res => {
            const obj = {id : res.id , ...res.data() };

            resolve(obj)
         })
     })
}

function sendMessageToDb(text,roomId){
      const message = {text , createdAt:Date.now() , userId : firebase.auth().currentUser.uid};

       db.collection('chatrooms').doc(roomId).collection('messages').add(message);
}

function getMessages(roomId){
    return new Promise( (resolve , reject) => {

        db.collection('chatrooms').doc(roomId).collection('messages').orderBy('createdAt').onSnapshot( docs => {
            const messages = [];
            docs.forEach( doc => {
                    const obj = { ...doc.data() , id : doc.id }
                    messages.push(obj)

            })
            resolve(messages)
        })
    })
}


export {
    getAllUsers,
    createUsers,
    checkAndCreateRoom,
    getRoomInformation,
    sendMessageToDb,
    getMessages
}