import React,{Component} from 'react';
import { StyleSheet, Text, View,KeyboardAvoidingView,ScrollView ,AsyncStorage,Alert,
  TouchableOpacity,TextInput,ActivityIndicator} from 'react-native';
import TabExample from '../Tabs/TabExample'
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';


export default class SignIn extends Component{
  state = {
    email:'',password:'',loading:false,loadingf:false
  }

Login(){
  this.setState({loading:true})
  fetch('https://alert-app4.herokuapp.com/users/login',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
    email:this.state.email,
    password:this.state.password
    })
    
    })
    .then( res => res.json())
    .then( (d) => { 
      console.log('d***',d)
      console.log('d***',d.name)
        Alert.alert('Alert','SignIn Successfull')
        const obj = {
          user : d
        }
          AsyncStorage.setItem('USER', JSON.stringify(obj)  ,() =>{
            AsyncStorage.getItem('USER', (error,result) =>{
              this.props.navigation.navigate('Home')
           });
          });
    })
}




  render(){
    return (
      <KeyboardAvoidingView  behavior='padding'>
      <ScrollView>
      <View style={{marginTop:80,paddingHorizontal:20}}>
            <View>
              <Text style={{color:'#3d5873',fontSize:25,fontWeight:'bold',textAlign:'center'}} >Login Page</Text>
            </View>
           
            <View style={{marginTop:80}}>
              <TextInput  placeholder='Email....' value={this.state.email} onChangeText={(email) => { this.setState({email}) }}
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

            
            <TouchableOpacity  onPress={()=>{  this.Login() }} style={{marginTop:50}}>
               {this.state.loading ? <View style={{backgroundColor:'white',borderRadius:6,color:'white',textAlign:'center',fontSize:17,
                  paddingVertical:10,borderColor:'#253e66',borderWidth:2}}>
                 <ActivityIndicator size="small" color="#253e66" /> 
                </View> :
                <Text style={{backgroundColor:'#3d5873',borderRadius:6,color:'white',textAlign:'left',fontSize:17,paddingVertical:12,
                paddingHorizontal:20}}>
                 <FontAwesome name='google-plus-square' size={27} color='white' style={{marginLeft:20 }} />{'                     '}  Login
                </Text>}
           </TouchableOpacity>

              <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('SignUp')}} style={{marginTop:20}}>
               <Text style={{color:'#3d5873',textAlign:'center',fontSize:15,}}>------------ SignUp -----------</Text>
              </TouchableOpacity>


            <TouchableOpacity  onPress={()=>{  this.login_facebook() }} style={{marginTop:30}}>
               {this.state.loadingf ? <View style={{backgroundColor:'white',borderRadius:6,color:'white',textAlign:'center',fontSize:17,
                  paddingVertical:10,borderColor:'#253e66',borderWidth:2}}>
                 <ActivityIndicator size="small" color="#253e66" /> 
                </View> :
                <Text style={{backgroundColor:'#0c5091fa',borderRadius:6,color:'white',textAlign:'left',fontSize:17,
                paddingVertical:10,paddingHorizontal:20}}>
                 <FontAwesome name='facebook-square' size={25} color='white' style={{marginLeft:20 }} />{'              '} Facebook Login
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
  
