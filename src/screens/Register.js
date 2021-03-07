import React from 'react';
import {Text, View, Image, TextInput,KeyboardAvoidingView, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';

const Register = (props) => {
    // const [email, setEmail] = React.useState("");
    // const [password, setPassword] = React.useState("");
    const image = require('../images/image.png');
    return (
        <View style={styles.contentContainer}>
            <Image source={image} style={styles.smallImage} />
            <Text style={{
                    fontSize: 20,
                    fontFamily:'Bold',
                    alignSelf: "center",
                    marginTop:25,
                    marginBottom: 25
                }}
                >Create an account</Text>
            <Text style={{
                    fontSize:15,
                    fontFamily:'Thin',
                    textAlign:"center",
                    marginTop:5,
                    opacity: 0.6,
                    //marginBottom:5
                }}>
                    Register account as:
                </Text>
            <View style={styles.buttonContainer}>
            <Button style={styles.smallButton} title="Organization" onPress={() => props.navigation.navigate('RegisterHost')} />
            <Text style={{
                fontSize:15,
                fontFamily:'Thin',
                textAlign:"center",
                opacity: 0.6,
                //marginBottom:5
            }}>or</Text>
            <Button style={styles.smallButton} title="Student Attendee" onPress={() => props.navigation.navigate('RegisterAttendee')} />
                
            </View>
            
        </View>
        
    )
}
const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor:"#fff7d5",
        flex: 1,
        alignItems: 'center',
         
    },
    smallImage: {
        marginTop:60,
        width: 200,
        height: 200,
    },
    inputContainer: {
        width: '90%',
        marginTop: 50,
        justifyContent:'space-evenly',
        
    },
    buttonContainer: {
        justifyContent:'space-evenly',
        height: '30%',
    },
    smallButton: {
    },
    icon: {
        marginRight: 15
    }
})


export default Register;
//export default class Register extends React.Component{



//     render(){
        
//         return(
            
//             <View style = {{backgroundColor:"#fff7d5", height:"100%"}}>
//                 <Image source= {require('../images/image.png')}
//                     style = {{width:"70%",height:"40%", alignSelf:"center"}}
//                 />
//                 <Text style={{
//                     fontSize: 30,
//                     fontFamily:'Bold',
//                     alignSelf: "center" 
//                 }}
//                 >Create an account!</Text>

//                 <Text style={{
//                     fontSize:15,
//                     fontFamily:'Regular',
//                     textAlign:"center",
//                     marginTop:5,
//                     opacity: 0.6
//                 }}>
//                     Register account as:
//                 </Text>

//                 <View style={{
//                     marginHorizontal:55,
//                     alignItems:"center",
//                     justifyContent:"center",
//                     marginTop:20,
//                     backgroundColor:"#003060",
//                     paddingVertical:10,
//                     borderRadius:23
//                 }}>
//                     <Text style={{
//                         color:"white",
//                         fontFamily:"SemiBold"
//                     }}>Host</Text>
//                 </View>

//                 <Text style={{
//                     fontSize:15,
//                     fontFamily:'Regular',
//                     textAlign:"center",
//                     marginTop:5,
//                     opacity: 0.6
//                 }}>
//                     or
//                 </Text>

//                 <View style={{
//                     marginHorizontal:55,
//                     alignItems:"center",
//                     justifyContent:"center",
//                     marginTop:10,
//                     backgroundColor:"#003060",
//                     paddingVertical:10,
//                     borderRadius:23
//                 }}>
//                     <Text style={{
//                         color:"white",
//                         fontFamily:"SemiBold"
//                     }}>Attendee</Text>
//                 </View>

//                 <View style={{
//                     flexDirection:"row",
//                     alignItems:"center",
//                     marginHorizontal:55,
//                     borderWidth:2,
//                     marginTop:50,
//                     paddingHorizontal:10,
//                     borderColor:"#003060",
//                     borderRadius:23,
//                     paddingVertical:2
//                 }}>
//                     <Icon name="mail" color="#003060" size={24}/>
//                     <TextInput 
//                         placeholder="Email"
//                         style={{paddingHorizontal:10}}
//                     />

//                 </View>

//                 <View style={{
//                     flexDirection:"row",
//                     alignItems:"center",
//                     marginHorizontal:55,
//                     borderWidth:2,
//                     marginTop:15,
//                     paddingHorizontal:10,
//                     borderColor:"#003060",
//                     borderRadius:23,
//                     paddingVertical:2
//                 }}>
//                    <Icon name="lock" color="#003060" size={24}/>
//                    <TextInput 
//                         secureTextEntry
//                         placeholder="Password"
//                         style={{paddingHorizontal:10}}
//                     />
  
//                 </View>

//                 <View style={{
//                     flexDirection:"row",
//                     alignItems:"center",
//                     marginHorizontal:55,
//                     borderWidth:2,
//                     marginTop:15,
//                     paddingHorizontal:10,
//                     borderColor:"#003060",
//                     borderRadius:23,
//                     paddingVertical:2
//                 }}>
                   
//                    <TextInput 
//                         secureTextEntry
//                         placeholder="Confirm Password"
//                         style={{paddingHorizontal:10}}
//                     />
                    

//                 </View>

//                 <View style={{
//                     marginHorizontal:55,
//                     alignItems:"center",
//                     justifyContent:"center",
//                     marginTop:30,
//                     backgroundColor:"#003060",
//                     paddingVertical:10,
//                     borderRadius:23
//                 }}>
//                     <Text style={{
//                         color:"white",
//                         fontFamily:"SemiBold"
//                     }}>Sign Up</Text>
//                 </View>

                
//             </View>
            
            
//         )
//     }
// }

