import React from 'react';
import {Text, View, Image, TextInput,KeyboardAvoidingView, StyleSheet, Platform} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';

const ViewHost= (props) => {
    return(
        <View style={styles.contentContainer}>
            <Text style={{
                fontSize: 20,
                fontFamily:'Bold',
                alignSelf: "center",
                marginTop:50
                
            }}
            >Host Account
            </Text>
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

export default ViewHost;