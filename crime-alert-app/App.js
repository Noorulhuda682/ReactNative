import React,{Component} from 'react';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import { createAppContainer ,} from "react-navigation";
// import MainNavigator from './Config/DrawerNav';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons,Feather} from '@expo/vector-icons';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,
  TouchableHighlight, FlatList, ScrollView,KeyboardAvoidingView, } from 'react-native';
import {Container,Content,Icon,Button,Header,Left, Title,Body,Right} from 'native-base';
import ContainDrawer from './Screen/Drawer'
import Constants from 'expo-constants';
import MainNavigator from './Config/navigation'


export default class App extends React.Component{
constructor(){
  super();
  this.state = {
    logo : true
  }
}

  componentWillMount(){
    setTimeout( () =>{
      this.setState({logo:false})
    },1000)
  }

  // #821dad purple
  // #4fc953 green 

  render(){
    return (
      this.state.logo ? 
        <View style={styles.container}>
        <TouchableOpacity style={{backgroundColor:'#821dad',display:"flex",flex:1,width:'100%',justifyContent: 'center'}} >
          <View style={{backgroundColor:'#3d5873',display:"flex",flex:1,width:'100%',justifyContent: 'center',
                alignItems: 'center',color:'white'}} > 
            <Feather name='alert-octagon' style={{marginTop:-150}} size={150} style={{color:'white'}}/>
           <Text style={{color:'white',fontWeight:'bold',fontSize:25}}>Crime Alerts</Text>
          </View>
       </TouchableOpacity>
       </View> :
       <MainNavigator/>
      );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
