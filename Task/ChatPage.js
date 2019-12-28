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
import { RNCamera } from 'react-native-camera';

import { 
  Switch,  Paragraph,  Avatar,  Subheading,  Title , Headline,Card,Surface, Caption,  Button,  HelperText,  IconButton, Colors ,  TouchableRipple ,
  Chip,  Divider,  ProgressBar,  RadioButton,  ToggleButton, Snackbar
} from 'react-native-paper';
import {Container,Content,Left,Body,Right,Thumbnail,H1,Footer} from 'native-base';
import { GiftedChat,Bubble } from 'react-native-gifted-chat';
import Headers from './Header'
class ChatPage extends Component{
   state = {
     text:'',
     messages:[],
     message:'',camera:false
   }

   componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Car name, Invoice',
          iconRight:'exist',
          payingMsg:'$ 7,896 Unpaid',
          // createdAt: new Date(),
          user: {
            _id: 1,
          },
        },
        {
          _id: 2,
          text: 'Get Direction',
          directionBox:'exist',
          user: {
            _id: 1,
            // name: 'React Native',
            // avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 4,
          text: 'Your test drive is',
          time:'Tomorrow, 10:00 AM',
          // createdAt: new Date(),
          user: {
            _id: 1,
            // name: 'React Native',
            // avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 5,
          user: {
            _id: 1,
          },
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0JCNm-NGKuwBWbcZjjbt7N-43v5rrXH0l63KvhoezGhoZy0Xb&s',
        },
        {
          _id: 6,
          text: 'Sed ut perspiciatis unde omnis.',
          // createdAt: new Date(),
          icon:'not_exist',
          user: {
            _id: 1,
            // name: 'React Native',
            // avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 7,
          text: 'Excepteur sint occaceat cupidatat non proident,sunt in culpa qui ',
          // createdAt: new Date(),
          user: {
            _id: 2,
          },
        },
        
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble (props) {
    return (
      <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: Colors.Secandary,
          borderRadius:0,
          marginRight:15,
        },
        left: {
          borderRadius:0,
          marginLeft:-30,
          paddingVertical:15
        }
      }}
      textStyle={{
        right: {
          color: "#023A40",
          backgroundColor:'#FFF3E0',
          paddingVertical:18,
          paddingHorizontal:15,
          borderWidth:2,
          borderColor:'#FFF3E0'
        },
        left: {
          color: "#023A40",
          textAlign:'center',
          fontSize:16,
        }
      }}
    />
    )
  }

  renderMessageImage (props) {
      return(
        <View style={{borderWidth:2,borderColor:'#FFF3E0',marginTop:10}}>
            <Image style={{width:80,height:80,}}  resizeMode="center" source={{uri:props.currentMessage.image}}/>
        </View>
      )
  }



  renderCustomView  (props) {
    console.log('Props',props.currentMessage._id)
    const userId = props.currentMessage.user._id;
    const text   = props.currentMessage.text; 
    const time   = props.currentMessage.time == undefined ? '' : props.currentMessage.time ; 
    const payingMsg   = props.currentMessage.payingMsg == undefined ? '' : props.currentMessage.payingMsg; 
    const iconRight   = props.currentMessage.iconRight; 
    const directionBox   = props.currentMessage.directionBox; 

    if(  userId == 2  ){
      return(
        <View style={{paddingVertical:0,paddingHorizontal:10,marginTop:10}}>
            <Text style={{color:'#023A40',textAlign:'center'}}>{text}</Text>
        </View>
      )
    }else{

      if(directionBox){
        return(
        <View style={styles.contentGetDirBox}>
          <Text style={styles.contentGetDirIcon}>
              <Entypo name='direction' style={{borderWidth:1}} color='white'/>
           </Text>
          <Text style={styles.contentGetDirTxt}>
            Get Direction
          </Text>
        </View>
        )
      }

      if(props.currentMessage.icon){
        return(
          <View style={{paddingVertical:15,paddingHorizontal:18,backgroundColor:'#FFF3E0',}}>
            <Text style={{color:'#023A40',textAlign:'center'}}>{text}</Text>
          </View>
        )  
      }else{
            return(
              <View style={{paddingVertical:10,paddingHorizontal:15,backgroundColor:'#FFF3E0',marginTop:15,
              display:'flex',flexDirection:'row'}}>
                <Text>
                  {time ?
                   <Ionicons     name='ios-car' size={40} color='#0c5242'/> :
                   <FontAwesome  name='file-text-o' style={{marginTop:35}} size={30} color='#0c5242'/>
                  } 
                </Text>
                <View style={{display:'flex',flexDirection:'column',paddingHorizontal:12}}>
                  <Text style={{color:'#023A40',fontWeight:'bold'}}>{text}</Text>
                  <Text>{time+payingMsg}</Text>
                </View>
                <View style={{paddingHorizontal:10}}> 
                </View>
                <Text style={{marginTop:7}}>
                {iconRight &&
                  <MaterialCommunityIcons  name='arrow-down-bold-circle-outline' size={25} color='#0c5242'/>
                }
                </Text>
              </View>
            )  
      }
    }
}

renderComposer (props){
  return(
    <View style={{backgroundColor:'red',height:50}}>
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
                    // value={this.state.message}
                    style={{borderColor:'rgb(18, 48, 92)',height:43,}}
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

    </View>
  )
}
renderActions (props){
  return(
    <View style={{backgroundColor:'red',height:50}}>
      <Text>Sendasd</Text>
    </View>
  )
}

renderChatFooter  (props) {
  return(
    <View style={{marginTop:10}}>
      <View style={styles.footerChild}>
          <View style={styles.footerLeft}>
            <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() =>{ this.setState({camera:true}) }}>
               <MaterialIcons name='camera-alt' size={22} color='#023A40'/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footerCenter}>
            <View style={styles.inputPrnt}>
              <TextInput
                placeholder='Say something ...'
                // value={this.state.message}
                style={{borderColor:'rgb(18, 48, 92)',height:43,}}
                onChangeText={(message)=>{  this.setState({ message }) }}
              />
            </View>
          </View>
          <View style={styles.footerRight}>
            <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() =>{ this.setState({camera:true}) }}>
                <MaterialCommunityIcons name='arrow-right' size={22} color='#023A40'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </View>
  )
}

renderInputToolbar  (props) {
  return(
    <View>
      <View style={{height:10}}>
      </View>
    </View>
  )
}
 
  render(){
    return (
        <Container>
            <StatusBar hidden/>
            {!this.state.camera ?
          <>
            <Headers/>
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{_id: 1,}}
                renderBubble={this.renderBubble}
                renderMessageImage={this.renderMessageImage}
                renderMessageText={this.renderCustomView}
                renderChatFooter={this.renderChatFooter} 
                renderInputToolbar={this.renderInputToolbar}  
                />
          </>
                :
                <View style={styles.container}>
                <RNCamera
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                      title: 'Permission to use camera',
                      message: 'We need your permission to use your camera',
                      buttonPositive: 'Ok',
                      buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                      title: 'Permission to use audio recording',
                      message: 'We need your permission to use your audio',
                      buttonPositive: 'Ok',
                      buttonNegative: 'Cancel',
                    }}
                >
                </RNCamera> 
              </View>
         }
        </Container> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
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
   contentGetDirBox:{
    backgroundColor:'#023A40',
    paddingVertical:15,
    paddingHorizontal:64.5,
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
    width:'100%',
   },
   footerLeft:{
      flex:1,
      alignItems:'center'
   },
   footerCenter:{
      flex:4.5,
   },
   inputPrnt:{
     borderWidth:1,
     borderColor:'#023A40',
     paddingLeft:10,

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


