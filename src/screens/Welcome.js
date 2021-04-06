import React from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';


export default class Welcome extends React.Component{
    render(){
        const {navigate} = this.props.navigation
        
        return(
            <View style = {{backgroundColor:"#fff7d5", height:"100%"}}>
                <Image source= {require('../images/image.png')}
                    style = {{width:"80%",height:"50%", alignSelf:"center"}}
                />
                <Text style={{
                    fontSize: 30,
                    fontFamily:'Bold',
                    alignSelf: "center" 
                }}
                >Start checking in now!</Text>

                <Text style={{
                    fontSize:15,
                    fontFamily:'Regular',
                    textAlign:"center",
                    marginTop:5,
                    opacity: 0.6
                }}>
                    Welcome to the check-in app.
                </Text>

                <View style={{marginTop:30}}>
                    {/* style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#003060",
                    paddingVertical:10,
                    borderRadius:23
                }}> */}
                    <Button
                        title="Log in as host"
                        onPress={() => navigate('LoginHost')}
                    />
                </View>

                <View style={{marginTop:30}}>
                    {/* style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#003060",
                    paddingVertical:10,
                    borderRadius:23
                }}> */}
                    <Button
                        title="Log in as attendee"
                        onPress={() => navigate('LoginAttendee')}
                    />
                </View>

               

                <Text 
                
                onPress={()=>navigate('Register')}
                
                style={{
                    alignSelf:"center",
                    color:"#288cdc",
                    fontFamily:"SemiBold",
                    paddingVertical:30
                }}>New User</Text>
            </View>
            
            
        )
    }
}