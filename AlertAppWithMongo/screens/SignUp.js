import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,secureTextEntry,
   TouchableHighlight, Button, Image, FlatList, ScrollView,KeyboardAvoidingView, } from 'react-native';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';



export default class SignUp extends React.Component {
  constructor(){
    super();
    this.state = {
      email:'',password:''
    }
  }

  SignUp(){
    console.log('SIgnUp working')
    this.props.navigation.navigate('Levels')
  }




render(){
  return(
    <KeyboardAvoidingView  behavior='padding'>
      <ScrollView>
      <View style={{marginTop:70}}>
            <View>
              <Text style={{color:'dodgerblue',fontSize:25,fontWeight:'bold',textAlign:'center'}} >SignUp Now</Text>
            </View>
           
            <View style={{marginTop:50}}>
              <TextInput  placeholder='Name....' value={this.state.email} onChangeText={(email) => { this.setState({email}) }}
              style={{borderRadius:4,backgroundColor:'white',width:270,fontSize:15,height:40,textAlign:'center',
              borderWidth:1,borderColor:'dodgerblue'}} />
            </View>

            <View style={{marginTop:20}}>
              <TextInput  placeholder='Email....' value={this.state.email} onChangeText={(email) => { this.setState({email}) }}
              style={{borderRadius:4,backgroundColor:'white',width:270,fontSize:15,height:40,textAlign:'center',
              borderWidth:1,borderColor:'dodgerblue'}} />
            </View>
            
            <View style={{marginTop:20}}>
              <TextInput  placeholder='Password' value={this.state.password} onChangeText={(password) => { this.setState({password}) }}
              style={{borderRadius:4,backgroundColor:'white',width:270,fontSize:15,height:40,textAlign:'center',
            borderWidth:1,borderColor:'dodgerblue'}} 
              secureTextEntry />
            </View>

            
            <TouchableOpacity  onPress={()=>{  this.SignUp() }} style={{marginTop:50}}>
                <Text style={{backgroundColor:'dodgerblue',borderRadius:6,color:'white',textAlign:'center',fontSize:17,paddingVertical:10}}>
                  Continue
                </Text>
           </TouchableOpacity>

           <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Login')}} style={{marginTop:50}}>
            <Text style={{color:'rgb(61, 110, 245)',textAlign:'right',fontSize:17}}>go to LogIn</Text>
           </TouchableOpacity>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
    )
 }
}