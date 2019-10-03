import React,{Component} from 'react';
import { StyleSheet, Text, View,KeyboardAvoidingView,ScrollView ,Image,
    TouchableOpacity,TextInput,ActivityIndicator} from 'react-native';
import TabExample from '../Tabs/TabExample'
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons,
    EvilIcons} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';    
import * as ImagePicker from 'expo-image-picker';  

// CrimeDate
// CrimeType
// Images Max 3

export default class CrimeInfo extends Component{
  state = {
     date:'',
     crimeType:'',
     img1:null,img2:null,img3:null
  }

  selectPicture = async (p) => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync();

    console.log('imageUi====>',uri);
    if(p == 1) this.setState({img1 : uri}) 
    if(p == 2) this.setState({img2 : uri}) 
    if(p == 3) this.setState({img3 : uri}) 
  }

  render(){
    return (
        <KeyboardAvoidingView  behavior='padding'>
        <ScrollView>
        <View style={{marginTop:80,paddingHorizontal:20}}>
              <View>
                <Text style={{color:'#253e66',fontSize:25,fontWeight:'bold',textAlign:'center'}} >Crime Info Form</Text>
              </View>
             
              <View style={{marginTop:40}}>
                 <Text style={{fontSize:16,marginBottom:5}}>
                      Crime Date
                  </Text>
                <TextInput  placeholder='12-5-2019' value={this.state.date} onChangeText={(date) => { this.setState({date}) }}
                style={{borderRadius:4,backgroundColor:'white',fontSize:15,height:46,textAlign:'center',
                borderWidth:1,borderColor:'gray'}} />
              </View>
              
              <View style={{marginTop:20}}>
               <Text style={{fontSize:16,marginBottom:5}}>
                      Crime Type
                </Text>
                <TextInput  placeholder='Bulglury' value={this.state.crimeType} onChangeText={(crimeType) => { this.setState({crimeType}) }}
                            style={{borderRadius:4,backgroundColor:'white',fontSize:15,height:46,textAlign:'center',
                            borderWidth:1,borderColor:'gray'}}
                />
              </View>

              <View style={{marginTop:20}}>
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
  
