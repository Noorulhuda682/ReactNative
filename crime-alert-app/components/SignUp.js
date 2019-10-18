import React,{Component} from 'react';
import { StyleSheet, Text, View,KeyboardAvoidingView,ScrollView ,AsyncStorage,Alert,
  TouchableOpacity,TextInput,ActivityIndicator,Dimensions,Image} from 'react-native';
import TabExample from '../Tabs/TabExample'
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons,EvilIcons} from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import MapView, {
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import * as Location from 'expo-location';

const screen = Dimensions.get('window');



export default class SignUp extends Component{
    state = {
        name:'',
        email:'',
        password:'',
        img:null,
        long:null,
        lat:null,
        loading:false
      };

      selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
        const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync();
    
        console.log('imageUi====>',uri);
        if(!cancelled) this.setState({img : uri}) 
      }
      

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    let location = await Location.getCurrentPositionAsync({});
    // console.log('location****', location)
    this.setState({ location });


    Location.watchPositionAsync({timeInterval: 1000, distanceInterval: 0.1}, loc => {
      // console.log('watching In SignUp***', loc);
      console.log('DeviceName***',Constants.deviceName,'platform',Constants.platform)
      this.setState({ long: loc.coords.longitude, lat: loc.coords.latitude})
    })
  }

  signup(){
    this.setState({loading:true})
    try{
      fetch('https://alert-app4.herokuapp.com/users/addUser',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
             name:this.state.name,
             email:this.state.email,
             password:this.state.password,
             img:this.state.img,
             lat:this.state.lat,
             long:this.state.long,
             pushToken:'empty'
            })
      })
      .then( res => res.json())
      .then( d => {
        // console.log('d****',d)
        const user = d.user;
        Alert.alert('Alert','Registration Sucessfull')
        AsyncStorage.setItem('USER', JSON.stringify({
            user
        })  ,() =>{
          AsyncStorage.getItem('USER', (error,result) =>{
            // console.log('USER===>',result)
            this.props.navigation.navigate('Home')
         });
        });
      })
    }
    catch(err){
      console.log('Error',err)
      // this.setState({loading:false})
    }

  }



  
  render(){
    return (
      <KeyboardAvoidingView  behavior='padding'>
      <ScrollView>
      <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('SignIn')}} style={{ fontSize: 18,marginTop:30,marginLeft:2 }}>
                    <Text>
                       <Entypo name='chevron-left' size={30} color='#821dad'/>{' '}
                    </Text> 
      </TouchableOpacity>
      <View style={{marginTop:10,paddingHorizontal:20,paddingBottom:50}}>
            <View>
              <Text style={{color:'#3d5873',fontSize:25,fontWeight:'bold',textAlign:'center'}} >Registration</Text>
            </View>

            <View style={{marginTop:50,marginBottom:25,borderRadius:4}}>
                      <TouchableOpacity onPress={() => {this.selectPicture()}} style={{borderWidth:1,width:93,borderRadius:3}} >
                          { this.state.img == null ? <Entypo name='user' size={90} color='lightgray'  /> :
                           <Image source={{uri: this.state.img}} style={{width:92,height:93,borderRadius:3 }} />
                          }

                      </TouchableOpacity>
           </View>
           
            <View style={{marginTop:10}}>
              <TextInput  placeholder='Name' value={this.state.name} onChangeText={(name) => { this.setState({name}) }}
              style={{borderRadius:4,backgroundColor:'white',fontSize:15,height:40,textAlign:'center',
              borderWidth:1,borderColor:'#3d5873'}} />
            </View>

            <View style={{marginTop:20}}>
              <TextInput  placeholder='Email' value={this.state.email} onChangeText={(email) => { this.setState({email}) }}
              style={{borderRadius:4,backgroundColor:'white',fontSize:15,height:40,textAlign:'center',
              borderWidth:1,borderColor:'#3d5873'}} />
            </View>
            
            <View style={{marginTop:20}}>
              <TextInput  placeholder='Password' value={this.state.password} onChangeText={(password) => { this.setState({password}) }}
              style={{borderRadius:4,backgroundColor:'white',fontSize:15,height:40,textAlign:'center',
            borderWidth:1,borderColor:'#3d5873'}}
               secureTextEntry
               />
            </View>

            
            <TouchableOpacity  onPress={()=>{  this.signup() }} style={{marginTop:30}}>
               {this.state.loading ? <View style={{backgroundColor:'white',borderRadius:6,color:'white',textAlign:'center',fontSize:17,
                  paddingVertical:10,borderColor:'#3d5873',borderWidth:2}}>
                 <ActivityIndicator size="small" color="#3d5873" /> 
                </View> :
                <Text style={{backgroundColor:'#821dad',borderRadius:6,color:'white',textAlign:'left',fontSize:17,paddingVertical:10,
                paddingHorizontal:20}}>
                 <FontAwesome name='google-plus-square' size={27} color='white' style={{marginLeft:20 }} />{'                     '}  SignUp
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
  
