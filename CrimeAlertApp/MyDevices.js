import React,{Component} from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail,Icon,Header,Left,Body,Title,Right,Button,
  List,ListItem,Badge } from 'native-base';


export default class MyDevices extends Component{
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
                MyDevices
            </Text>
            </Body>
         </Header>
     <Content style={{paddingHorizontal:10,marginTop:10}}>
        <Card>
            <CardItem style={{textAlign:'center',display:'flex',borderBottomColor:'lightgray',borderBottomWidth:1,}}> 
                <Text style={{fontSize:18,fontWeight:'bold'}}>Noir A1</Text>
            </CardItem>

            <CardItem style={{textAlign:'center',display:'flex',borderBottomColor:'lightgray',borderBottomWidth:1,
              justifyContent:'center',alignItems:'center',height:100}}> 
              <Text>Model Description</Text>
            </CardItem>

            <CardItem>
                <Icon name={'ios-pin'} style={{color : '#ED4A6A'}} />
                <Text style={{color:'lightgray'}}>see location</Text>
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
  
