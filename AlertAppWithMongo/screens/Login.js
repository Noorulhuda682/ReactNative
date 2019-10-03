import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,secureTextEntry,AsyncStorage,  ActivityIndicator,
   TouchableHighlight, Button, Image, FlatList, ScrollView,KeyboardAvoidingView} from 'react-native';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';



export default class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      email:'',password:'',loading:false,user:[]
    }
  }

Login(){
   this.setState({loading:true})
 try{
     fetch('https://mysimple-app.herokuapp.com/users/getUserWithEmail',{
          method:'POST',
          headers:{
                    'Content-Type':'application/json'
          },
          body: JSON.stringify({email:this.state.email})
      })
      .then( res => res.json())
      .then( d =>{ 
        console.log(d)
        if(d.result.length){
          this.setState({user:d.result})
            AsyncStorage.setItem('user', d.result ,() =>{
             AsyncStorage.getItem('user', (error,result) =>{
               console.log('USER===>',result)
               this.props.navigation.navigate('Home')
             });
            });
        }
      })
  }
  catch(e){
     console.log('Error occured in Login===>')
  } 
  finally{
    //  this.setState({loading:false})
  } 
}





render(){
  return(
    <KeyboardAvoidingView  behavior='padding'>
      <ScrollView>
      <View style={{marginTop:80}}>
            <View>
              <Text style={{color:'dodgerblue',fontSize:25,fontWeight:'bold',textAlign:'center'}} >Login Page</Text>
            </View>
           
            <View style={{marginTop:80}}>
              <TextInput  placeholder='email....' value={this.state.email} onChangeText={(email) => { this.setState({email}) }}
              style={{borderRadius:4,backgroundColor:'white',width:270,fontSize:15,height:40,textAlign:'center',
              borderWidth:1,borderColor:'dodgerblue'}} />
            </View>
            
            <View style={{marginTop:20}}>
              <TextInput  placeholder='password' value={this.state.password} onChangeText={(password) => { this.setState({password}) }}
              style={{borderRadius:4,backgroundColor:'white',width:270,fontSize:15,height:40,textAlign:'center',
            borderWidth:1,borderColor:'dodgerblue'}}
               secureTextEntry
               />
            </View>

            
            <TouchableOpacity  onPress={()=>{  this.Login() }} style={{marginTop:50}}>
               {this.state.loading ? <View style={{backgroundColor:'white',borderRadius:6,color:'white',textAlign:'center',fontSize:17,
                  paddingVertical:10,borderColor:'dodgerblue',borderWidth:2}}>
                 <ActivityIndicator size="small" color="dodgerblue" /> 
                </View> :
                <Text style={{backgroundColor:'dodgerblue',borderRadius:6,color:'white',textAlign:'center',fontSize:17,paddingVertical:10}}>
                  Login
                </Text>}
           </TouchableOpacity>

           <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('SignUp')}} style={{marginTop:50}}>
            <Text style={{color:'blue',textAlign:'right',fontSize:17}}>Do not have account ! SignUp</Text>
           </TouchableOpacity>
            
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
    )
 }
}
