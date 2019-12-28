import React,{Component} from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,AsyncStorage,ActivityIndicator,ToastAndroid,
  TouchableHighlight, Image, FlatList, ScrollView,KeyboardAvoidingView,Dimensions,Picker,StatusBar } from 'react-native';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { update_user } from '../store/action';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import { 
  Switch,  Paragraph,  Avatar,  Subheading,  Title , Headline,Card,Surface, Caption,  Button,  HelperText,  IconButton, Colors ,  TouchableRipple ,
  Chip,  Divider,  ProgressBar,  RadioButton,  ToggleButton, Snackbar
} from 'react-native-paper';
import {Container,Content,Header,Left,Body,Right,Thumbnail,H1,Footer} from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

class Headers extends Component{
   state = {
     text:'',
     messages:[]
   }

  
  render(){
    return (
          <Header style={styles.header}>           
             <View style={styles.headerChild}>
               <View style={styles.headerChildLeft}>
                 <View style={styles.headerBack}>
                    <Ionicons name='ios-arrow-back' size={25} color='#0f6343'/>  
                 </View>
                 <View style={styles.headerUserInfo}>
                   <View style={styles.headerUserInfoImg}>
                      <View style={{borderWidth:1,borderRadius:50,width:30,height:30,borderColor:'lightgray'}}> 
                         <Image style={{width:30,height:30,borderRadius:50}} source={{uri:'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}/>
                      </View>
                   </View>
                   <View style={styles.headerUserInfoName}>
                    <Caption style={{fontWeight:'bold',alignItems:'flex-end',color:'#286b55',fontSize:10,paddingLeft:2}}>Jan Doe</Caption>
                    <Caption style={{marginTop:-6,fontSize:9,color:'#088267',paddingLeft:2}}>Online</Caption>
                   </View>
                 </View>
               </View>
               <View style={styles.headerChildRight}>
                 <Text style={styles.hCRText}>
                   <MaterialCommunityIcons name='dots-vertical' size={25} color='#0f6343'/>
                 </Text>
               </View>
             </View>
          </Header>

    );
  }
}

const styles = StyleSheet.create({
// CONTENT STYLING IS FROM BELOW  
   header:{
     backgroundColor:'white',
     paddingVertical:5,
     height:65,
     paddingHorizontal:10,
   },
   headerChild:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-end',
    paddingHorizontal:10
   },
   headerChildLeft:{
    flex:2,
    flexDirection:'row'
   },
   headerChildRight:{
    flex:1,
    alignSelf:"center"
   },
   hCRText:{
    textAlign:'right',
    marginTop:25
   },
   headerBack:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
   },
   headerUserInfo:{
    flex:16,
    flexDirection:'row'
   },
   headerUserInfoImg:{
    flex:1.2,
    alignItems:'center',
    justifyContent:'center'
   },
   headerUserInfoName:{
    flex:5,
    justifyContent:'center'
   },

});




const mapStateToProps = state => {
  // console.log('weconfuse***====>',state);
  return {
      user: state.user,
      todos: state.todos
  }
}

const mapDispatchToProps = dispatch => {
  // console.log('we====>');  
  return {
      store_user: (user) => dispatch(update_user(user)),
      update_todos: () => dispatch(update_todos())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers);


