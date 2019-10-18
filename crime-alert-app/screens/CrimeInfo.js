import React,{Component} from 'react';
import { StyleSheet, Text, View,KeyboardAvoidingView,ScrollView ,Image,AsyncStorage,Alert,
    TouchableOpacity,TextInput,ActivityIndicator} from 'react-native';
import TabExample from '../Tabs/TabExample'
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons,
    EvilIcons} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';    
import * as ImagePicker from 'expo-image-picker';  
import { Notifications } from 'expo';
import * as Location from 'expo-location';
// CrimeType
// Images Max 3

export default class CrimeInfo extends Component{
  constructor(){
    super();
    this.state = {
      loading:false,
      crimeType:'',
      img1:null,
      img2:null,
      img3:null,
      lat:null,
      long:null,
      name:'',
      email:'',
      userImg:'',
      tokensArray:[]
    }
  }


  async componentDidMount(){
    const userObj = await AsyncStorage.getItem('USER');
    const parseUser = JSON.parse(userObj);
    console.log('userEmail',parseUser)
    const userEmail = parseUser.user.email;
    const userName = parseUser.user.name;
    const userUserImg = parseUser.user.img;

    let location = await Location.getCurrentPositionAsync({});
    console.log('locationWithStatus****',location.coords.longitude,location.coords.latitude)

    this.setState({ 
      long: location.coords.longitude, 
      lat: location.coords.latitude,
      name:userName,
      email:userEmail,
      userImg:userUserImg
    });

    fetch('https://alert-app4.herokuapp.com/users/getAllPushTokens',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
      email:userEmail,
      })
      
      })
      .then( res => res.json())
      .then( (d) =>{
        // tokensArray
         console.log('IAM D***',d)
         const tokenArr = d.result.map( (v) => {
           return v.pushToken;
         })
         this.setState({tokensArray:tokenArr})
      })
  
  }


  selectPicture = async (p) => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync();
    // console.log('imageUi====>',uri);
    if(p == 1) this.setState({img1 : uri}) 
    if(p == 2) this.setState({img2 : uri}) 
    if(p == 3) this.setState({img3 : uri}) 
  }

  submit(){
    this.setState({loading:true})

        const d = new Date();
        const s = d.getSeconds();
        const m = d.getMinutes();
        const h = d.getHours();
        const D = d.getDate();
        const M = d.getMonth();
        const Y = d.getFullYear(); 
        const timeObj = {
          s,m,h,D,M,Y
        } 
      
        fetch('https://alert-app4.herokuapp.com/posts/addPosts',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
          name: this.state.name, 
          email:this.state.email,
          password:'hidden',
          userImg:this.state.userImg,
          lat:this.state.lat,
          long:this.state.long,
          crimeType:this.state.crimeType,
          crimeTime:timeObj,
          img1:this.state.img1,
          img2:this.state.img2,
          img3:this.state.img3,
          })
          })
          .then( res => res.json())
          .then( (d) => {
              // console.log('Add Posts',d)
              Alert.alert(d.message)
              this.setState({
                loading:false,
                crimeType:'',
                img1:null,
                img2:null,
                img3:null,
                lat:null,
                long:null,
              })
              this.registerForPushNotifications();
          });
  }

  registerForPushNotifications = async () => {
    const { status}  = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
     console.log('status***',status)
    // if (status == 'granted') {
      // var token = await Notifications.getExpoPushTokenAsync();
      // console.log("token: ",token);
    // }

    return fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to   : this.state.tokensArray,
        sound:'default',
        title: this.state.name,
        body:'Added new crime scene post'
      }),
    });
};







  render(){
    console.log('tokensArray',this.state.tokensArray);
    return (
        <KeyboardAvoidingView  behavior='padding'>
        <ScrollView>
        <View style={{marginTop:80,paddingHorizontal:20}}>
              <View>
                <Text style={{color:'#253e66',fontSize:25,fontWeight:'bold',textAlign:'center'}} >Crime Info Form</Text>
              </View>
             
              <View style={{marginTop:50}}>
               <Text style={{fontSize:16,marginBottom:5}}>
                      Crime Type
                </Text>
                <TextInput  placeholder='Bulglury' value={this.state.crimeType} onChangeText={(crimeType) => { this.setState({crimeType}) }}
                            style={{borderRadius:4,backgroundColor:'white',fontSize:15,height:46,textAlign:'center',
                            borderWidth:1,borderColor:'gray'}}
                />
              </View>

              <View style={{marginTop:30}}>
                  <Text style={{fontSize:16,marginBottom:5}}>
                      Images Max 3
                  </Text>
                    <View style={{marginBottom:25,borderRadius:4,display:'flex',borderColor:'gray',
                        flexDirection:'row'}}>
                      <TouchableOpacity onPress={() => {this.selectPicture(1)}} style={{flex:1,}}>
                          { this.state.img1 == null ? <EvilIcons name='camera' size={110} color='gray' /> :
                           <Image source={{uri: this.state.img1}} style={{height:100,borderRadius:5 }} />
                         }

                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {this.selectPicture(2)}} style={{flex:1,}}>
                          { this.state.img2 == null ? <EvilIcons name='camera' size={110} color='gray' /> :
                           <Image source={{uri: this.state.img2}} style={{height:100,borderRadius:5,marginRight:2,marginLeft:2 }} />
                         }

                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {this.selectPicture(3)}} style={{flex:1,}}>
                          { this.state.img3 == null ? <EvilIcons name='camera' size={110} color='gray' /> :
                           <Image source={{uri: this.state.img3}} style={{height:100,borderRadius:5 }} />
                         }

                      </TouchableOpacity>
                   </View>
              </View>
  
              
              <TouchableOpacity  onPress={()=>{  this.submit() }} style={{marginTop:26}}>
                 {this.state.loading ? <View style={{backgroundColor:'white',borderRadius:6,color:'white',textAlign:'center',fontSize:17,
                    paddingVertical:10,borderColor:'#253e66',borderWidth:2}}>
                   <ActivityIndicator size="small" color="#253e66" /> 
                  </View> :
                  <Text style={{backgroundColor:'#253e66',borderRadius:6,color:'white',textAlign:'center',fontSize:17,paddingVertical:15,}}>
                       Submit
                  </Text>}
             </TouchableOpacity>
  

        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth:1
    },
  });
  
