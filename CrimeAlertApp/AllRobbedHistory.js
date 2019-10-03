import React,{Component} from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail,Icon,Header,Left,Body,Title,Right,Button } from 'native-base';
import MapView, {
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import * as Location from 'expo-location';


export default class AllRobbedHistory extends Component{
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
              AllRobbedHistory
          </Text>
          </Body>

        </Header>

        <Content style={{paddingHorizontal:10}}>
        <Card>
           <CardItem>
                  <Left>
                    <Thumbnail source={{uri:'data:image/png;base64,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'}} />
                    <Body>
                      <Text>profile</Text>
                    </Body>
                  </Left>
            </CardItem>

            <CardItem style={{textAlign:'center',display:'flex',borderBottomColor:'lightgray',borderBottomWidth:1,}}> 
                <Text style={{fontSize:15,fontWeight:'bold'}}>Bulglury</Text>
            </CardItem>

            <MapView
                    style={{height:200,width:'100%'}}
                    showsUserLocation={true}
                    showsCompass={true}
                    rotateEnabled={false}
                  >
       
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
