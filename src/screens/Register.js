import React from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';

export default class Register extends React.Component{

    render(){
        
        return(
            <View style = {{backgroundColor:"#fff7d5", height:"100%"}}>
                <Image source= {require('../images/image.png')}
                    style = {{width:"70%",height:"40%", alignSelf:"center"}}
                />
                <Text style={{
                    fontSize: 30,
                    fontFamily:'Bold',
                    alignSelf: "center" 
                }}
                >Create an account!</Text>

                <Text style={{
                    fontSize:15,
                    fontFamily:'Regular',
                    textAlign:"center",
                    marginTop:5,
                    opacity: 0.6
                }}>
                    Register account as:
                </Text>

                <View style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:20,
                    backgroundColor:"#003060",
                    paddingVertical:10,
                    borderRadius:23
                }}>
                    <Text style={{
                        color:"white",
                        fontFamily:"SemiBold"
                    }}>Host</Text>
                </View>

                <Text style={{
                    fontSize:15,
                    fontFamily:'Regular',
                    textAlign:"center",
                    marginTop:5,
                    opacity: 0.6
                }}>
                    or
                </Text>

                <View style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:10,
                    backgroundColor:"#003060",
                    paddingVertical:10,
                    borderRadius:23
                }}>
                    <Text style={{
                        color:"white",
                        fontFamily:"SemiBold"
                    }}>Attendee</Text>
                </View>

                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:50,
                    paddingHorizontal:10,
                    borderColor:"#003060",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                    <Icon name="mail" color="#003060" size={24}/>
                    <TextInput 
                        placeholder="Email"
                        style={{paddingHorizontal:10}}
                    />

                </View>

                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:15,
                    paddingHorizontal:10,
                    borderColor:"#003060",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                   <Icon name="lock" color="#003060" size={24}/>
                   <TextInput 
                        secureTextEntry
                        placeholder="Password"
                        style={{paddingHorizontal:10}}
                    />
  
                </View>

                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:15,
                    paddingHorizontal:10,
                    borderColor:"#003060",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                   
                   <TextInput 
                        secureTextEntry
                        placeholder="Confirm Password"
                        style={{paddingHorizontal:10}}
                    />
                    

                </View>

                <View style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#003060",
                    paddingVertical:10,
                    borderRadius:23
                }}>
                    <Text style={{
                        color:"white",
                        fontFamily:"SemiBold"
                    }}>Sign Up</Text>
                </View>

                
            </View>
            
            
        )
    }
}