import React,{Component} from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,AsyncStorage,
  TouchableHighlight, Image, FlatList, ScrollView,KeyboardAvoidingView,Dimensions } from 'react-native';
import {Container,Content,Icon,Button,Header,Left, Title,Body,Right,Card,CardItem} from 'native-base';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import MapView, {
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import * as Location from 'expo-location';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Home extends Component{
  state = {
    searchLoc :'',
    latitude:24.8221049,
    longitude:67.0062475,
    region : null,
    user:null,
    robbed:false,
    marker_lat: LATITUDE,
    marker_long: LONGITUDE,
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
    }),
  };

  async searchLoc(){
   const NR = await  Location.geocodeAsync(this.state.searchLoc);
   console.log('LATLOONG***',this.state.searchLoc,NR[0].longitude,NR[0].latitude);
  //  this.setState({latitude:NR[0].latitude,longitude:NR[0].longitude,searchLoc:''})
   this.setState({ region:{latitude:NR[0].latitude,longitude:NR[0].longitude,latitudeDelta: 0.0922, longitudeDelta: 0.0421 } })
  }




  async componentDidMount() {
    const userObj = await AsyncStorage.getItem('USER');
    const parseUser = JSON.parse(userObj);
    const userEmail = parseUser.user.email;
    const { status}  = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    var token = await Notifications.getExpoPushTokenAsync();
    // console.log("token: ",token);
  //  console.log('status***',status)
   if( status  == 'granted' && parseUser.user.pushToken == 'empty'){
              fetch('https://alert-app4.herokuapp.com/users/addPushToken',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
              email:userEmail,
              pushToken:token
              })
              })
              .then( res => res.json())
              .then( (d) => {
                  // console.log('Expected Output',d)
                  this.setState({user:parseUser.user})
              });
   }
    // this.registerForPushNotifications();
    await Permissions.askAsync(Permissions.LOCATION);
    const location = await Location.getCurrentPositionAsync({});
    // console.log('location****', location)
    this.setState({ location });

    Location.watchPositionAsync({timeInterval: 1000, distanceInterval: 0.1}, loc => {
      // console.log('watching***', loc);
      this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude})
    })

  
  }

  

registerForPushNotifications = async () => {
    const { status}  = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
     console.log('status***',status)
    if (status == 'granted') {
      var token = await Notifications.getExpoPushTokenAsync();
      // console.log("token: ",token);
    }

    return fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to   : token,
        sound:'default',
        title:'NoorDev',
        body:'Demo Notification That created with the hardorking of Noor'
      }),
    });
};


  render(){
    // console.log('CONSTANTS',Constants.deviceName ,Constants.deviceYearClass,Constants.platform    )
    return (     
     <Container>
     {this.state.robbed && 
       <Card style={{marginTop:35,position:'absolute',zIndex:1}}>
           <CardItem style={{justifyContent:'center',display:'flex',borderBottomColor:'lightgray',borderBottomWidth:1,}}> 
               <Text style={{fontSize:18,fontWeight:'bold'}}>Prompt Inf</Text>
           </CardItem>

           <CardItem style={{justifyContent:'center',display:'flex',borderBottomColor:'lightgray',borderBottomWidth:1,
             height:200}}> 
               <Text style={{fontSize:18,}}>Do  you want to add some information about crime </Text>
           </CardItem>
     
           <CardItem style={{borderTopColor:'lightgray',borderTopWidth:1}}>

              <TouchableOpacity onPress={() =>{ this.setState({robbed:false}),this.props.navigation.navigate('CrimeInfo') }}
              style={{backgroundColor:'dodgerblue',padding:10,borderRadius:3,marginLeft:10}}>
                <Text style={{color:'white'}}>NOW</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>{ this.setState({robbed:false}) }}
              style={{backgroundColor:'dodgerblue',padding:10,borderRadius:3,marginLeft:10}}>
                <Text style={{color:'white'}}>LATER</Text>
              </TouchableOpacity>
           </CardItem>
      </Card>}
     


        <Header style={{marginTop:24,backgroundColor:'#3d5873'}} >
           <Left>
            <Button transparent style={{borderColor:'white'}} 
              onPress={() => this.props.navigation.openDrawer() }  >
              <Icon name='ios-menu' style={{color:'white',fontSize:25}}/>
            </Button>
           </Left>
           <Body style={{borderBottomWidth:1,borderBottomColor:'black',display:'flex',flexDirection:'row',marginLeft:10}}>
                <TextInput placeholder='Search Location' style={{color:'white',}}
                  value={this.state.searchLoc} onChangeText={(searchLoc) => { this.setState({searchLoc}) }} />
           </Body>

                <TouchableOpacity  onPress={() =>{ this.searchLoc() }}
                style={{backgroundColor:'dodgerblue',padding:3,borderRadius:3,marginLeft:10,borderWidth:1,height:35,marginTop:10}}
                >
                    <MaterialCommunityIcons name='search-web' size={25} color='white' />
                </TouchableOpacity>

           <Right>
           <TouchableOpacity onPress={() =>{ this.setState({robbed:true}) }}
           style={{backgroundColor:'dodgerblue',padding:10,borderRadius:3,borderWidth:1}}>
             <Text style={{color:'white'}}>Robbed!</Text>
           </TouchableOpacity>
           </Right>
        </Header>

        <MapView
              style={{height:555,}}
              initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              region={this.state.region}
              showsUserLocation={true}
              showsCompass={true}
              rotateEnabled={false}
            >
              
              <Marker ref={marker => { this.marker = marker; }}
                coordinate={{ latitude: this.state.marker_lat, longitude: this.state.marker_long }}
              />

 
        </MapView>





     </Container> 
   
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


