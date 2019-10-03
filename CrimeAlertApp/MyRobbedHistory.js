import React,{Component} from 'react';
import { StyleSheet, Text, View ,Image,Dimensions} from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail,Icon,Header,Left,Body,Title,Right,Button } from 'native-base';
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
  render(){
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
      <Card>
            <CardItem style={{textAlign:'center',display:'flex',borderBottomColor:'lightgray',borderBottomWidth:1,}}> 
                <Text style={{fontSize:18,fontWeight:'bold'}}>Bulglury</Text>
            </CardItem>

            <MapView
                    style={{height:200,width:'100%'}}
                    initialRegion={{
                      latitude: LATITUDE,
                      longitude: LONGITUDE,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}
                    showsUserLocation={true}
                    showsCompass={true}
                    rotateEnabled={false}
                  >
       
                    <Marker ref={marker => { this.marker = marker; }}
                      coordinate={{ latitude: 24.8822179, longitude: 67.0652013 }}/>

            </MapView> 

            <CardItem style={{borderTopColor:'lightgray',borderTopWidth:1}}>
                <Icon name={'ios-time'} style={{color : '#ED4A6A'}} />
                <Text style={{color:'lightgray'}}> 12 23 2019</Text>
            </CardItem>
       </Card>
     </Content>
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
  