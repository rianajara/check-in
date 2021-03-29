import React from 'react';
import {Text, View, Image, TextInput,KeyboardAvoidingView, StyleSheet, Platform} from 'react-native';
import { Button , Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';

const ViewAttendee= (props) => {
    return(
        <View style={styles.contentContainer}>
            <Text style={{
                fontSize: 20,
                fontFamily:'Bold',
                alignSelf: "center",
                marginTop:50
            }}
            >Attendee Account</Text>
            
        {/* Need to find way to get current user information on to input --- connect to user database for this */}
        <Button style={styles.smallButton}  title="Modify Attendee" onPress ={()=>props.navigation.navigate('ModifyAttendee')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor:"#fff7d5",
        flex: 1,
        alignItems: 'center',
        justifyContent:'space-evenly'  
    },
    inputContainer: {
        width: '90%',
        marginTop: 50,
        justifyContent:'space-evenly',
        
    },
    buttonContainer: {
        justifyContent:'space-around',
        height: '30%',
    },
    smallButton: {
    },
    icon: {
        marginRight: 15
    }
})

export default ViewAttendee;