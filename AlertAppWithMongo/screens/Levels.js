import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,
   TouchableHighlight, Button, Image, FlatList, ScrollView,KeyboardAvoidingView, } from 'react-native';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';



export default class Levels extends React.Component {
  constructor(){
    super();
    this.state = {
      email:'',password:''
    }
  }


render(){
  return(
    <KeyboardAvoidingView  behavior='padding'>
      <ScrollView>
           <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('SignUp')}}  style={{backgroundColor:'dodgerblue',
                  width:400,padding:29,paddingBottom:5,borderBottomColor:'rgba(0,0,0,0.5)',borderBottomWidth:2}}>
                <Text style={{backgroundColor:'#1a9aa3',borderRadius:4,color:'white',textAlign:'center',width:75,
                 fontSize:13,paddingVertical:1,borderWidth:2,borderColor:'rgba(0,0,0,0.8)', }}>
                  <SimpleLineIcons name='logout' size={22} />
                  Logout
                </Text>
                <Text style={{fontSize:22,color:'white',textAlign:'center',fontWeight:"bold",marginTop:15,paddingRight:50}}
                >Check Your Typing Speed </Text>
           </TouchableOpacity>
      <View style={{marginTop:90}}>


            <View>
              <Text style={{color:'#0c569c',fontSize:30,fontWeight:'bold',textAlign:'center'}} >Levels</Text>
            </View>
           
            
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Game',{color:'#1a9aa3',time:120,value:'Easy'})}}  style={{marginTop:50}}>
                <Text style={{backgroundColor:'#1a9aa3',borderRadius:4,color:'white',textAlign:'center',
                fontSize:17,paddingVertical:10,width:200,marginLeft:80 }}>
                  Easy
                </Text>
           </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Game',{color:'#4eb50e',time:100,value:'Medium'})}}  style={{marginTop:50}}>
                <Text style={{backgroundColor:'#4eb50e',borderRadius:4,color:'white',textAlign:'center',
                fontSize:17,paddingVertical:10,width:200,marginLeft:80 }}>
                  Medium
                </Text>
           </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Game',{color:'#c41280',time:60,value:'Hard'})}}  style={{marginTop:50}}>
                <Text style={{backgroundColor:'#c41280',borderRadius:4,color:'white',textAlign:'center',
                fontSize:17,paddingVertical:10,width:200,marginLeft:80 }}>
                  Hard
                </Text>
           </TouchableOpacity>

            
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
    )
 }
}