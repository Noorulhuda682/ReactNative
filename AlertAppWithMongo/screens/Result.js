import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,
   TouchableHighlight, Button, Image, FlatList, ScrollView,KeyboardAvoidingView, } from 'react-native';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';



export default class Result extends React.Component {
  state = {
    levelColor:'dodgerblue',correct:0,incorrect:0
  }

  componentDidMount(){
    console.log('PropsNavigation====>',this.props.navigation.getParam('color'))
    this.setState({levelColor:this.props.navigation.getParam('color')})
    this.setState({correct:this.props.navigation.getParam('CorrectWords')})
    this.setState({incorrect:this.props.navigation.getParam('IncorrectWords')})
  }

render(){
  return(
    <KeyboardAvoidingView  behavior='padding' style={{display:'flex',flex:1,width:'100%',alignItems:'center',backgroundColor:'#FEFDF1',
    borderLeftWidth:9,borderColor:this.state.levelColor,borderRadius:15,borderRightWidth:9,borderTopWidth:4,borderBottomWidth:4}}>
      
          <View style={{borderWidth:3,borderColor:this.state.levelColor,borderRadius:5,padding:20,paddingHorizontal:97,fontSize:46,marginTop:80}}>
              <Text style={{color:this.state.levelColor,fontSize:25,fontWeight:'bold'}}>Result</Text>
          </View>

          <View style={{borderWidth:3,borderColor:this.state.levelColor,borderRadius:5,padding:25,paddingHorizontal:86,fontSize:26,marginTop:50}}>
            <Text style={{color:this.state.levelColor,fontSize:18}}>CoorectWords  {' '}: {this.state.correct}</Text>
            <Text style={{color:this.state.levelColor,fontSize:18,marginTop:10}}>IncorrectWords : {this.state.incorrect}</Text>
          </View>

          <View style={{borderWidth:3,borderColor:this.state.levelColor,borderRadius:5,padding:20,paddingHorizontal:97,fontSize:46,marginTop:40}}>
              <Text style={{color:this.state.levelColor,fontSize:25,fontWeight:'bold'}}>Score : {(this.state.correct*100)/50}{'%'}</Text>
          </View>

          <View style={{borderColor:'white',borderRadius:5,padding:20,paddingHorizontal:33,fontSize:26,marginTop:50,
        display:'flex',flexDirection:'row'}}>
             <TouchableOpacity onPress={() =>{ this.props.navigation.navigate('Home') }}
             style={{flex:1,backgroundColor:this.state.levelColor,borderRadius:5,padding:20,}}>
               <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Home</Text>
             </TouchableOpacity>

             <TouchableOpacity style={{flex:0.1,backgroundColor:'white'}}>
               <Text style={{textAlign:'center'}}></Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={() =>{ this.props.navigation.navigate('Game',{color:this.state.levelColor}) }} 
             style={{flex:1,backgroundColor:this.state.levelColor,borderRadius:5,padding:20,}}>
               <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Restart</Text>
             </TouchableOpacity>
          </View>


    </KeyboardAvoidingView>
    )
 }
}





