import React from 'react';
import {Text, View, Image, TextInput,KeyboardAvoidingView, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';

const LoginHost = (props) => {
    // const [email, setEmail] = React.useState("");
    // const [password, setPassword] = React.useState("");
    const image = require('../images/image.png');
    return (
        <View style={styles.contentContainer}>
            <Image source={image} style={styles.smallImage} />
            <Text style={{
                    fontSize: 20,
                    fontFamily:'Bold',
                    alignSelf: "center" 
                }}
                >Organization Host Sign In</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Host Email'
                    leftIcon={
                        <Icon
                            name='mail'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    // onChangeText={text => setEmail(text)}
                    // value={email}
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Enter password'
                    secureTextEntry={true}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    // onChangeText={text => setPassword(text)}
                />
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor:"#fff7d5",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 15
    },
    smallImage: {
        width: 200,
        height: 200,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10
    },
    buttonContainer: {
        height: '40%',
        justifyContent: 'space-around'
    },
    smallButton: {
    },
    icon: {
        marginRight: 15
    }
})

export default LoginHost;