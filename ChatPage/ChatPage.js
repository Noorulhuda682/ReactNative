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

class ChatPage extends Component{
   state = {
     message:''
   }




  render(){
    return (
        <Container>
            <StatusBar hidden
            //  backgroundColor="white" barStyle='dark-content'
             />
          <Header style={styles.header}>           
             <View style={styles.headerChild}>
               <View style={styles.headerChildLeft}>
                 <View style={styles.headerBack}>
                    <Ionicons name='ios-arrow-back' size={25} color='#0f6343'/>  
                 </View>
                 <View style={styles.headerUserInfo}>
                   <View style={styles.headerUserInfoImg}>
                      <View style={{borderWidth:1,borderRadius:50,width:30,height:30,borderColor:'lightgray'}}> 
                         {/* <Image style={{width:30,height:30,borderRadius:50}} source={{uri:'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}/> */}
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



          <Content style={styles.content}>
            <View style={styles.contentChild}>
              <View style={styles.contentLeft}>
                <View style={styles.contentLeftMsgBox}>
                   <Text style={styles.contentLeftMsgText}>
                     Excepteur sint occaceat cupidatat non proident,sunt in culpa qui 
                   </Text>
                </View>
              </View>
              <View style={styles.contentRight}>
                 <View style={styles.contentRightMsgBox}>
                    <Text style={styles.contentRightMsgText}>
                      Sed ut perspiciatis unde omnis.
                    </Text>
                 </View>
              </View>
              <View style={styles.contentRight}>
                 <View style={styles.contentRightImgBox}>
                       <Image style={{width:70,height:75,}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0JCNm-NGKuwBWbcZjjbt7N-43v5rrXH0l63KvhoezGhoZy0Xb&s'}}/>
                 </View>
              </View>
              <View style={styles.contentRight}>
                 <View style={styles.contentRightMsgIconBox}>
                    <View style={styles.contentRightMsgWithIcon}>
                      <View style={styles.contentRightMsgIcon}>
                         <Ionicons name='ios-car' size={40} color='#0c5242'/>
                      </View>
                      <View style={styles.contentRightMsgtxt}>
                        <Text style={{fontWeight:'bold',color:'#0c5242'}}>
                          Your test drive is
                        </Text> 
                        <Text style={{color:'#0c5242'}}>
                          Tomorrow, 10:00 AM
                        </Text>
                      </View>
                    </View>
                 </View>
              </View>
              <View style={styles.contentRightGreen}>
                <View style={styles.contentGetDirBox}>
                    <Text style={styles.contentGetDirIcon}>
                        <Entypo name='direction' style={{borderWidth:1}} color='white'/>
                     </Text>
                    <Text style={styles.contentGetDirTxt}>
                      Get Direction
                    </Text>
                 </View>
              </View>
              <View style={styles.contentRight}>
                 <View style={styles.contentRightMsgIconBox}>
                    <View style={styles.contentRightMsgWithIcon}>
                      <View style={styles.contentRightMsgIcon}>
                         <FontAwesome name='file-text-o' size={35} color='#0c5242'/>
                      </View>
                      <View style={styles.contentRightMsgtxt}>
                        <Text style={{fontWeight:'bold',color:'#0c5242'}}>
                          Car name, Invoice
                        </Text> 
                        <Text style={{color:'#0c5242'}}>
                          $ 7,896 Unpaid
                        </Text>
                      </View>
                      <View style={styles.contentRightMsgIconRight}>
                        <MaterialCommunityIcons name='arrow-down-bold-circle-outline' size={25} color='#0c5242'/>
                      </View>
                    </View>
                 </View>
              </View>
            </View>
            <View style={{marginTop:30}}></View>
          </Content>


          <Footer style={styles.footer}>
            <View style={styles.footerChild}>
              <View style={styles.footerLeft}>
                <View style={{marginTop:10}}>
                  <MaterialIcons name='camera-alt' size={22} color='#023A40'/>
                </View>
              </View>
              <View style={styles.footerCenter}>
                <View style={styles.inputPrnt}>
                  <TextInput
                    placeholder='Say something ...'
                    value={this.state.message}
                    style={{borderColor:'rgb(18, 48, 92)',height:43}}
                    onChangeText={(message)=>{  this.setState({ message }) }}
                  />
                </View>
              </View>
              <View style={styles.footerRight}>
                <View style={{marginTop:10}}>
                  <MaterialCommunityIcons name='arrow-right' size={22} color='#023A40'/>
                </View>
              </View>
            </View>
          </Footer>
        </Container> 
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
    //  borderBottomWidth:.2,
    //  borderBottomColor:'lightgray'
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
// CONTENT STYLING IS FROM BELOW  //////////////////////////////////////////////////
   content:{
    borderTopWidth:2,
    borderColor:'white',
    paddingVertical:20,
    paddingHorizontal:20
   },
   contentLeft:{

   },
   contentLeftMsgBox:{
    backgroundColor:'#F2F2F2',
    paddingVertical:20,
    paddingHorizontal:15,
    width:'77%'
   },
   contentLeftMsgText:{
      color:'#0c5242',
   },
   contentRight:{
    marginTop:13,
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'flex-end'
   },
   contentRightMsgBox:{
    backgroundColor:'#FFF3E0',
    paddingVertical:20,
    paddingHorizontal:15,
    width:'77%'
   },
   contentRightMsgText:{
    color:'#0c5242',
   },
   contentRightImgBox:{
    backgroundColor:'#FFF3E0',
    paddingVertical:1.4,
    paddingHorizontal:1,
   },
   contentRightMsgIconBox:{
    backgroundColor:'#FFF3E0',
    paddingVertical:10,
    paddingHorizontal:10,
    width:'77%'
   },
   contentRightMsgWithIcon:{
     display:'flex',
     flexDirection:'row'
   },
   contentRightMsgIcon:{

   },
   contentRightMsgtxt:{
    marginLeft:10,
   },
   contentRightMsgIconRight:{
     width:'30%',
     display:'flex',
     alignItems:'flex-end',
     justifyContent:'center'
   },
   contentRightGreen:{
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'flex-end'
   },
   contentGetDirBox:{
    backgroundColor:'#023A40',
    paddingVertical:15,
    paddingHorizontal:15,
    width:'77%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
   },
   contentGetDirIcon:{
    borderWidth:.5,
    borderColor:'white',
    paddingVertical:3,
    paddingHorizontal:3,
    borderRadius:50
   },
   contentGetDirTxt:{
    color:'white',
    marginLeft:6
   },
// FOOTER STYLING IS FROM BELOW  /////////////////////////////////////////////////////
   footer:{
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'white'
   },
   footerChild:{
    display:'flex',
    flexDirection:'row',
    width:'100%'
   },
   footerLeft:{
      flex:1,
      alignItems:'center'
   },
   footerCenter:{
      flex:4.5
   },
   inputPrnt:{
     borderWidth:1,
     borderColor:'#023A40',
     paddingLeft:10
   },
   footerRight:{
      flex:1,
      alignItems:'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);


