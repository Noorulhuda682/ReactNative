import React,{Component} from 'react';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import { createAppContainer ,} from "react-navigation";
// import MainNavigator from './Config/DrawerNav';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons,Feather} from '@expo/vector-icons';

import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,Image,AsyncStorage,
  TouchableHighlight, FlatList, ScrollView,KeyboardAvoidingView, } from 'react-native';
import {Container,Content,Icon,Button,Header,Left, Title,Body,Right} from 'native-base';




export default class ContentComponent extends Component{
     state = {
        c1:'white',c2:'white',c3:'white',c4:'white',c5:'white',
        b1:'dodgerblue',b2:'#3d5873',b3:'#3d5873',b4:'#3d5873',b5:'#3d5873',d:null
     }


   navigated(p){
   //  console.log('Parameter***',p)
    const {c1,c2,c3,c4,c5,b1,b2,b3,b4,b5} = this.state;
    if(p == 'Home'){
    this.setState({ 
      c1:'white',c2:'white',c3:'white',c4:'white',c5:'white',
      b1:'dodgerblue',b2:'#3d5873',b3:'#3d5873',b4:'#3d5873',b5:'#3d5873'
    })}
    if(p == 'MyDevices'){
    this.setState({ 
      c1:'white',c2:'white',c3:'white',c4:'white',c5:'white',
      b1:'#3d5873',b2:'dodgerblue',b3:'#3d5873',b4:'#3d5873',b5:'#3d5873'
    })}
    if(p == 'MyRobbedHistory'){
    this.setState({ 
      c1:'white',c2:'white',c3:'white',c4:'white',c5:'white',
      b1:'#3d5873',b2:'#3d5873',b3:'dodgerblue',b4:'#3d5873',b5:'#3d5873'
    })}
    if(p == 'AllRobbedHistory'){
    this.setState({ 
      c1:'white',c2:'white',c3:'white',c4:'white',c5:'white',
      b1:'#3d5873',b2:'#3d5873',b3:'#3d5873',b4:'dodgerblue',b5:'#3d5873'
    })}
    if(p == 'CrimeInfo'){
    this.setState({ 
      c1:'white',c2:'white',c3:'white',c4:'white',c5:'white',
      b1:'#3d5873',b2:'#3d5873',b3:'#3d5873',b4:'#3d5873',b5:'dodgerblue'
    })}


   }

   async componentDidMount(){
      const d = await AsyncStorage.getItem('USER')
      const data = JSON.parse(d) 
      this.setState({d:data.user})
   }

   async logout(){
      await AsyncStorage.setItem('USER','null')
      this.props.navigation.navigate('SignIn')
   }

  render(){
   const {c1,c2,c3,c4,c5,b1,b2,b3,b4,b5,d} = this.state;
   // console.log('Please',d)
    return (
        <View style={{color:'black',backgroundColor:'#3d5873',paddingVertical:50}}>
    
        <View style={{color:'black',backgroundColor:'white',height:200,backgroundColor:'#3d5873',
         display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',}}>
            <View style={{paddingHorizontal:10,paddingVertical:10}}>
             {d &&  <Image source={{uri:d.img}}      style={{width: 75,height:75,borderRadius:5,}} /> }
            </View>
             <Text style={{fontSize:18,marginTop:3,color:'white'}}>
                {d ? d.name : 'Profile'}
             </Text>
             <Text style={{fontSize:13,marginTop:3,color:'#82aff5'}}>
                {d ? d.email : 'Email'}
             </Text>
        </View>

        <TouchableOpacity style={{backgroundColor:b1,display:'flex',flexDirection:'row',
        paddingHorizontal:20,paddingVertical:13,}}
        onPress={() =>{ this.props.navigation.navigate('Home') , this.navigated('Home') }}
        >
           <FontAwesome name='home' size={22} color={c1} />
           <Text style={{fontSize:15,paddingLeft:40,paddingTop:2,color:c1,}}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:b2,display:'flex',flexDirection:'row',
        paddingHorizontal:20,paddingVertical:13,}}
        onPress={() =>{ this.props.navigation.navigate('MyDevices'), this.navigated('MyDevices') }}
        >
           <Entypo name='classic-computer' size={21} color={c2} style={{paddingRight:-5}} />
           <Text style={{fontSize:15,paddingLeft:38,paddingTop:2,color:c2,}}>MyDevices</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:b3,display:'flex',flexDirection:'row',
        paddingHorizontal:20,paddingVertical:13,}}
        onPress={() =>{ this.props.navigation.navigate('MyRobbedHistory'), this.navigated('MyRobbedHistory') }}
        >
           <FontAwesome name='history' size={21} color={c3}  />
           <Text style={{fontSize:15,paddingLeft:40,paddingTop:2,color:c3}}>MyRobbedHistory</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:b4,display:'flex',flexDirection:'row',
        paddingHorizontal:20,paddingVertical:13,}}
        onPress={() =>{ this.props.navigation.navigate('AllRobbedHistory'), this.navigated('AllRobbedHistory') }}
        >
           <FontAwesome name='history' size={22} color={c4}  />
           <Text style={{fontSize:15,paddingLeft:40,paddingTop:2,color:c4}}>AllRobbedHistory</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:b5,display:'flex',flexDirection:'row',
        paddingHorizontal:20,paddingVertical:13,}}
        onPress={() =>{ this.props.navigation.navigate('CrimeInfo'), this.navigated('CrimeInfo') }}
        >
           <AntDesign name='form' size={23} color={c5}  />
           <Text style={{fontSize:15,paddingLeft:40,paddingTop:2,color:c5}}>PostForm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:'#3d5873',display:'flex',flexDirection:'row',marginBottom:100,
        paddingHorizontal:20,paddingVertical:13,}}
        onPress={() =>{ this.logout() }}
        >
           <Feather name='log-out' size={23} color={c5}  />
           <Text style={{fontSize:15,paddingLeft:40,paddingTop:2,color:'white'}}>Sign Out</Text>
        </TouchableOpacity>
  </View>
      );
  }
}



