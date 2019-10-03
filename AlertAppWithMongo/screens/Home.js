import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,
   TouchableHighlight, Button, Image, FlatList, ScrollView,KeyboardAvoidingView, } from 'react-native';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';



export default class Result extends React.Component {
  state = {
    levelColor:'dodgerblue'
  }



render(){
  return(
    <KeyboardAvoidingView  behavior='padding' style={{display:'flex',flex:1,width:'100%',alignItems:'center',backgroundColor:'#FEFDF1',
    borderLeftWidth:9,borderColor:this.state.levelColor,borderRadius:15,borderRightWidth:9,borderTopWidth:4,borderBottomWidth:4}}>
      
      <Text style={{color:'#1a9aa3',fontSize:30,fontWeight:'bold',marginTop:70}}>Check Your</Text>
      <Text style={{color:'#4eb50e',fontSize:30,fontWeight:'bold',marginTop:30}}>Typing</Text>
      <Text style={{color:'#c41280',fontSize:30,fontWeight:'bold',marginTop:30}}>Speed Here</Text>


  


          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Levels')}}
          style={{borderWidth:3,borderColor:this.state.levelColor,borderRadius:5,padding:20,paddingHorizontal:97,fontSize:46,marginTop:100,
        backgroundColor:'dodgerblue'}}>
              <Text style={{color:'white',fontSize:25,fontWeight:'bold'}}>Type Now</Text>
          </TouchableOpacity>

    </KeyboardAvoidingView>
    )
 }
}





