import React,{Component} from 'react';
import { StyleSheet, Text, View ,Image,Dimensions,ActivityIndicator,AsyncStorage,TouchableOpacity,TextInput} from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail,Icon,Header,Left,Body,Title,Right,Button } from 'native-base';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';
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


export default class MyRobbedHistory extends Component{
  state = {
    allPosts : [],currentUser:'',loading:true,
    detail:false,
    detailInfo:null,
    detailAddress:null
  }


async componentDidMount(){
const userObj = await AsyncStorage.getItem('USER');
const parseUser = JSON.parse(userObj);
const userEmail = parseUser.user.email;
fetch('https://alert-app4.herokuapp.com/posts/getAllPosts')
       .then( res => res.json())
         .then( d => {
           this.setState({allPosts:d.result,currentUser:userEmail,loading:false})
         })  
}

async detail(ve){
  const result = await Location.reverseGeocodeAsync({latitude:ve.lat,longitude:ve.long})
  console.log('Detail',result[0].name,result[0]),

  this.setState({detail:true,detailInfo:ve,detailAddress:result[0]});

}

componentDidUpdate(){
  this.componentDidMount()
}

  render(){
    const {allPosts,currentUser,detailInfo,detailAddress} = this.state;
    return (
    <Container>

       <Header style={{marginTop:20,lineHeight:200}}>

          <Button transparent style={{borderColor:'white'}} 
          onPress={() => this.props.navigation.openDrawer() }  >
            <Icon name='ios-menu' style={{color:'white',fontSize:25}}/>
          </Button>
          <Body style={{paddingLeft:30}}>
          <Text style={{color:'white',paddingLeft:10,fontSize:18,}}>
              MyRobbedHistory
          </Text>
          </Body>

        </Header>

      <Content style={{paddingHorizontal:10}}>
           {this.state.loading && <View style={{marginTop:30}}>
                 <ActivityIndicator size="large" color="blue" /> 
            </View>} 

         {allPosts.map( (v,i) => {
          if( v.email === currentUser){
           return(
            <Card key={i}>
            <CardItem style={{height:53}}>
                   <Left>
                     <Thumbnail square style={{height:35,width:35,borderWidth:1,borderColor:'gray'}} source={{uri:v.userImg}} />
                     <Body>
                       <Text style={{fontWeight:'bold'}} >{v.name}</Text>
                     </Body>
                   </Left>
                   <Right>
                        <Text style={{fontSize:15,fontWeight:'bold',color:'#3d5873'}}>{v.crimeType}</Text>
                  </Right>
             </CardItem>
 
             <MapView  style={{height:140,width:'100%'}}
               initialRegion={{
                 latitude:v.lat,
                 longitude:v.long,
                 latitudeDelta: .01,
                 longitudeDelta: .01,
               }}
                     showsUserLocation={true}
                     showsCompass={true}
                     rotateEnabled={false}
               >
                 <Marker ref={marker => { this.marker = marker; }}
                coordinate={{ latitude: v.lat, longitude: v.long}}/>
        
             </MapView> 
 
             <CardItem style={{borderTopColor:'lightgray',borderTopWidth:1,height:35}}>
                 <Icon name={'ios-time'} style={{color : '#ED4A6A'}} />
                 <Text style={{color:'lightgray'}}>{v.crimeTime.h}:{v.crimeTime.m}:{v.crimeTime.s}{'  '}{v.crimeTime.D}/{v.crimeTime.M}/{v.crimeTime.Y}</Text>
                 <TouchableOpacity style={{backgroundColor:'dodgerblue',display:'flex',flexDirection:'row',borderRadius:3,borderColor:'black',
                       borderWidth:1,paddingHorizontal:5,marginLeft:60}}
                       onPress={() =>{ this.detail(v) }}
                      >
                        <Text style={{fontSize:15,backgroundColor:'dodgerblue',borderRadius:3,color:'white'}}>
                        <MaterialIcons size={25} name='view-list' style={{color:'white'}} />
                        </Text>
                        <Text style={{fontSize:15,backgroundColor:'dodgerblue',borderRadius:3,color:'white',fontWeight:'bold',fontSize:18}}>
                           Details
                        </Text>
                      </TouchableOpacity>
             </CardItem>
         </Card>
           )
          } 
          })}
     </Content>


     {this.state.detail &&  <View style={{position:'absolute',width:'100%',height:800,paddingHorizontal:8,backgroundColor:'rgba(0,0,0,0.7)',paddingVertical:20}}>
          <Card style={{backgroundColor:'white',paddingBottom:4}}>
                <CardItem style={{height:2}}>
                    <Left/>
                    <Body/>
                    <Right>
                      <Entypo name='squared-cross' size={18} color='gray'  onPress={()=>{ this.setState({detail:false})}}/>
                    </Right>
                </CardItem>
                <CardItem style={{display:'flex',flexDirection:'column',borderBottomWidth:1}}>
                   <Text style={{color:'dodgerblue',fontSize:21,fontWeight:'bold'}}>{detailInfo.crimeType}</Text>
                   <Text>At : {detailAddress.street}{detailAddress.city}{detailAddress.country}</Text>
                </CardItem>
                <CardItem style={{height:47,borderBottomWidth:2,borderBottomColor:'gray'}}>
                      <Left>
                        <Thumbnail style={{height:35,width:35,borderWidth:1,borderColor:'green'}} source={{uri:detailInfo.userImg}} />
                        <Body>
                          <Text style={{fontWeight:'bold'}} >{detailInfo.name}</Text>
                        </Body>
                      </Left>
                </CardItem>

                <CardItem style={{display:'flex',flexDirection:'column',}}>
                   <Image style={{height:120,width:'100%',borderRadius:3}} source={{uri:detailInfo.img1}} />
                   {detailInfo.img2 &&  <Image style={{height:120,width:'100%',borderRadius:3,marginTop:2}} source={{uri:detailInfo.img2}} /> }
                   {detailInfo.img3 &&  <Image style={{height:120,width:'100%',borderRadius:3,marginTop:2}} source={{uri:detailInfo.img3}} /> }
                </CardItem>

                       <TextInput  placeholder='add comment' value={this.state.password} onChangeText={(password) => { this.setState({password}) }}
                        style={{borderRadius:4,backgroundColor:'white',fontSize:15,textAlign:'center', borderWidth:1,borderColor:'gray'}}
                       />
                       <TouchableOpacity style={{backgroundColor:'dodgerblue',paddingHorizontal:10,paddingVertical:7,borderRadius:4,marginTop:2}}>
                         <Text style={{color:'red',textAlign:'center',color:'white',fontWeight:'bold'}}>send</Text>
                       </TouchableOpacity>
    
            </Card>
      </View>}
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
  