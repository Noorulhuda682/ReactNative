import React,{Component} from 'react';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import { createAppContainer ,} from "react-navigation";
// import MainNavigator from './Config/DrawerNav';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';

import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,Image,
  TouchableHighlight, FlatList, ScrollView,KeyboardAvoidingView, } from 'react-native';
import {Container,Content,Icon,Button,Header,Left, Title,Body,Right} from 'native-base';



export default class ContentComponent extends Component{
     state = {
        c1:'white',c2:'black',c3:'black',c4:'black',c5:'black',
        b1:'dodgerblue',b2:'rgba(0,0,0,0.1)',b3:'rgba(0,0,0,0.1)',b4:'rgba(0,0,0,0.1)',b5:'rgba(0,0,0,0.1)'
     }


   navigated(p){
    console.log('Parameter***',p)
    const {c1,c2,c3,c4,c5,b1,b2,b3,b4,b5} = this.state;
    if(p == 'Home'){
    this.setState({ 
      c1:'white',c2:'black',c3:'black',c4:'black',c5:'black',
      b1:'dodgerblue',b2:'rgba(0,0,0,0.1)',b3:'rgba(0,0,0,0.1)',b4:'rgba(0,0,0,0.1)',b5:'rgba(0,0,0,0.1)'
    })}
    if(p == 'MyDevices'){
    this.setState({ 
      c1:'black',c2:'white',c3:'black',c4:'black',c5:'black',
      b1:'rgba(0,0,0,0.1)',b2:'dodgerblue',b3:'rgba(0,0,0,0.1)',b4:'rgba(0,0,0,0.1)',b5:'rgba(0,0,0,0.1)'
    })}
    if(p == 'MyRobbedHistory'){
    this.setState({ 
      c1:'black',c2:'black',c3:'white',c4:'black',c5:'black',
      b1:'rgba(0,0,0,0.1)',b2:'rgba(0,0,0,0.1)',b3:'dodgerblue',b4:'rgba(0,0,0,0.1)',b5:'rgba(0,0,0,0.1)'
    })}
    if(p == 'AllRobbedHistory'){
    this.setState({ 
      c1:'black',c2:'black',c3:'black',c4:'white',c5:'black',
      b1:'rgba(0,0,0,0.1)',b2:'rgba(0,0,0,0.1)',b3:'rgba(0,0,0,0.1)',b4:'dodgerblue',b5:'rgba(0,0,0,0.1)'
    })}
    if(p == 'CrimeInfo'){
    this.setState({ 
      c1:'black',c2:'black',c3:'black',c4:'black',c5:'white',
      b1:'rgba(0,0,0,0.1)',b2:'rgba(0,0,0,0.1)',b3:'rgba(0,0,0,0.1)',b4:'rgba(0,0,0,0.1)',b5:'dodgerblue'
    })}


   }



  render(){
   const {c1,c2,c3,c4,c5,b1,b2,b3,b4,b5} = this.state;
    return (
        <View style={{color:'black',borderWidthL:2,borderColor:'white'}}>
    
        <View style={{color:'black',backgroundColor:'white',height:200,borderColor:'gray',borderBottomWidth:2,
         display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:20}}>
            <View style={{borderWidth:2,paddingHorizontal:10,paddingVertical:10}}>
              <Image source={{uri: 'https://seeklogo.com/images/R/runkeeper-logo-354C996E11-seeklogo.com.png'}} 
               style={{width: 70,height:70,borderWidth:4,borderColor:'blue'}} />
            </View>

             <Text style={{color:'black',fontSize:18,marginTop:5}}>My Profile</Text>
        </View>

        <TouchableOpacity style={{backgroundColor:b1,display:'flex',flexDirection:'row',
        paddingHorizontal:20,paddingVertical:16,borderBottomWidth:1,borderColor:'white'}}
        onPress={() =>{ this.props.navigation.navigate('Home') , this.navigated('Home') }}
        >
           <FontAwesome name='home' size={24} color={c1} />
           <Text style={{fontSize:15,paddingLeft:40,paddingTop:2,fontWeight:'bold',color:c1,}}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:b2,display:'flex',flexDirection:'row',
        paddingHorizontal:20,paddingVertical:16,borderBottomWidth:1,borderColor:'white'}}
        onPress={() =>{ this.props.navigation.navigate('MyDevices'), this.navigated('MyDevices') }}
        >
           <Entypo name='classic-computer' size={23} color={c2} style={{paddingRight:-5}} />
           <Text style={{fontSize:15,paddingLeft:38,paddingTop:2,fontWeight:'bold',color:c2,}}>MyDevices</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:b3,display:'flex',flexDirection:'row',
        paddingHorizontal:20,paddingVertical:16,borderBottomWidth:1,borderColor:'white'}}
        onPress={() =>{ this.props.navigation.navigate('MyRobbedHistory'), this.navigated('MyRobbedHistory') }}
        >
           <FontAwesome name='history' size={23} color={c3}  />
           <Text style={{fontSize:15,paddingLeft:40,paddingTop:2,fontWeight:'bold',color:c3}}>MyRobbedHistory</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:b4,display:'flex',flexDirection:'row',
        paddingHorizontal:20,paddingVertical:16,borderBottomWidth:1,borderColor:'white'}}
        onPress={() =>{ this.props.navigation.navigate('AllRobbedHistory'), this.navigated('AllRobbedHistory') }}
        >
           <FontAwesome name='history' size={23} color={c4}  />
           <Text style={{fontSize:15,paddingLeft:40,paddingTop:2,fontWeight:'bold',color:c4}}>AllRobbedHistory</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:b5,display:'flex',flexDirection:'row',
        paddingHorizontal:20,paddingVertical:16,borderBottomWidth:1,borderColor:'white'}}
        onPress={() =>{ this.props.navigation.navigate('CrimeInfo'), this.navigated('CrimeInfo') }}
        >
           <MaterialCommunityIcons name='information' size={24} color={c5}  />
           <Text style={{fontSize:15,paddingLeft:40,paddingTop:2,fontWeight:'bold',color:c5}}>CrimeInfo</Text>
        </TouchableOpacity>

  </View>
      );
  }
}



