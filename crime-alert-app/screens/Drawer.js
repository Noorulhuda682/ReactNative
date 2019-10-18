import React,{Component} from 'react';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import { createAppContainer ,} from "react-navigation";

import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,
  TouchableHighlight, FlatList, ScrollView,KeyboardAvoidingView, } from 'react-native';
import {Container,Content,Icon,Button,Header,Left, Title,Body,Right} from 'native-base';

import Home from './Home'
import MyRobbedHistory from './MyRobbedHistory'
import MyDevices from './MyDevices'
import CrimeInfo from './CrimeInfo'
import AllRobbedHistory from './AllRobbedHistory'
import ContentComponent from './ContentComponent'
import SignIn from '../components/SignIn';

const MyNavigator = createDrawerNavigator({
  Home: {
    screen: Home,     
  },
  MyRobbedHistory: {
    screen: MyRobbedHistory
  },
  MyDevices: {
    screen: MyDevices
  },
  AllRobbedHistory:{
    screen:AllRobbedHistory
  },
  CrimeInfo:{
    screen:CrimeInfo
  }
},
 {
   contentOptions    : {
   activeTintColor   : 'dodgerblue',
   inactiveTintColor   : 'dodgerblue',
   activeBackgroundColor: 'red',
   },
  initialRouteName  : 'Home',
  contentComponent  :ContentComponent,
  drawerPosition    : 'Left',
  drawerOpenRoute   : 'DrawerOpen',
  drawerCloseRoute  : 'DrawerClose',
  drawerToggleRoute : 'DrawerToggle',


 }
);

export default MyNavigator;
  
