import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,
   TouchableHighlight, Button, Image, FlatList, ScrollView,KeyboardAvoidingView, } from 'react-native';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
import {Data} from './Data'


export default class Game extends React.Component {
    state = {
      s:0,levelColor:'dodgerblue',time:0,data:'',email:'',CorrectWords:0,IncorrectWords:0,description:true
    }
  

  componentDidMount(){   
    this.setState({
    levelColor:this.props.navigation.getParam('color'),
    data:Data,
    time:this.props.navigation.getParam('time')
  })

  }
componentDidUpdate(){
  var l = this.state.email.length; 
  // console.log('length',l,this.state.email.slice(0))
  // console.log('DATA',this.state.data);
  console.log('DATA',this.state.CorrectWords,this.state.IncorrectWords);
  if(this.state.email.slice(l-1,l) == " "){
     this.space();
     this.setState({email:''})
     if(this.state.CorrectWords+this.state.IncorrectWords == 50 || this.state.s == this.state.time){
      this.props.navigation.navigate('Result',{
        color:this.state.levelColor,
        CorrectWords: this.state.CorrectWords,
        IncorrectWords: this.state.IncorrectWords,
      })
    }
  }

}

space(){
  var firstSpaceIndex = this.state.data.indexOf(" ")
  console.log('I AM SPACE***',firstSpaceIndex,this.state.data.slice(0,firstSpaceIndex) ,'I AM EMAIL',this.state.email.length,this.state.email.slice(0,this.state.email.length) )
  // console.log('THE REST ****',this.state.data.slice(firstSpaceIndex+1))
  this.setState({data:this.state.data.slice(firstSpaceIndex+1)})
  if( this.state.data.slice(0,firstSpaceIndex) === this.state.email.slice(0,this.state.email.length-1)){
    console.log('Correct Word')
    this.setState({CorrectWords:this.state.CorrectWords+1})
  }
  else{
    console.log('InCorrect Word')
    this.setState({IncorrectWords:this.state.IncorrectWords+1})
  }

}
  
go(){
  this.setState({description:false,s:0})
}

  componentWillMount(){
   this.timer =  setInterval( () =>{
      this.setState({s:this.state.s+1})
    },1000)
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }


render(){
  console.log('Time*****',this.state.time)
  return(
  !this.state.description ?  <KeyboardAvoidingView  behavior='padding' style={{borderWidth:5,display:'flex',flex:1,width:'100%',backgroundColor:this.state.levelColor}}>
      <ScrollView>
      <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Levels')}}>
       <View style={{marginTop:25,borderBottomWidth:1,paddingLeft:10}}>
        <MaterialIcons name='delete-forever' size={40} color='white'/>
       </View> 
      </TouchableOpacity> 
      <View style={{marginTop:150}}>
            <View>
              <Text style={{color:'white',fontSize:30,fontWeight:'bold',textAlign:'center'}} >
                <Ionicons name='ios-stopwatch' size={38}/>{'  '}
                : {' '}{this.state.s}</Text>
            </View>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Result',{color:this.state.levelColor})}}
             style={{marginTop:30,backgroundColor:'white',borderWidth:1,borderColor:this.state.levelColor,borderRadius:10,paddingHorizontal:20}}>
              <Text style={{color:this.state.levelColor,fontSize:18,fontWeight:'normal',textAlign:'center',height:150}} >
                  {this.state.data}
              </Text>
            </TouchableOpacity>

            <View style={{marginTop:92}}>
              <TextInput  placeholder='Start Now...' value={this.state.email} onChangeText={(email) => { this.setState({email}) }}
              style={{borderRadius:4,backgroundColor:'white',width:'100%',fontSize:15,height:45,paddingLeft:15,
              borderWidth:2,borderColor:this.state.levelColor}} />
            </View>
              
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
    :
    <KeyboardAvoidingView  behavior='padding' style={{display:'flex',flex:1,width:'100%',alignItems:'center',backgroundColor:'#FEFDF1',
    borderLeftWidth:9,borderColor:this.state.levelColor,borderRadius:15,borderRightWidth:9,borderTopWidth:4,borderBottomWidth:4}}>
      
          <View style={{borderWidth:3,borderColor:this.state.levelColor,borderRadius:5,padding:20,paddingHorizontal:97,fontSize:46,marginTop:80}}>
              <Text style={{color:this.state.levelColor,fontSize:25,fontWeight:'bold'}}>Description</Text>
          </View>

          <View style={{borderWidth:3,borderColor:this.state.levelColor,borderRadius:5,padding:25,paddingHorizontal:86,fontSize:26,marginTop:50}}>
            <Text style={{color:this.state.levelColor,fontSize:18}}>Total words : 50</Text>
            <Text style={{color:this.state.levelColor,fontSize:18,marginTop:10}}>Total time : {this.state.time}{'sec'}</Text>
          </View>

          <View style={{borderWidth:3,borderColor:this.state.levelColor,borderRadius:5,padding:20,paddingHorizontal:97,fontSize:26,marginTop:40}}>
              <Text style={{color:this.state.levelColor,fontSize:18,fontWeight:'bold'}}>HighScore : {'70%'}</Text>
          </View>

          <View style={{borderColor:'white',borderRadius:5,padding:20,paddingHorizontal:33,fontSize:26,marginTop:50,
          display:'flex',flexDirection:'row'}}>
             <TouchableOpacity onPress={() =>{ this.go()}}
             style={{flex:1,backgroundColor:this.state.levelColor,borderRadius:5,padding:15,}}>
               <Text style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:23}}>Go</Text>
             </TouchableOpacity>

          </View>


    </KeyboardAvoidingView>
    )
 }
}