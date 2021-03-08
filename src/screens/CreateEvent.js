import React, {useEffect, useState} from 'react';
import {Text, View, Image, TextInput,KeyboardAvoidingView, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CreateEvent = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateSelected, setDateSelected] = useState(''); 
    const [timeSelected, setTimeSelected] = useState("");

    const showDatePicker = () => {
    setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    console.log(date)
    setDateSelected(date);
    hideDatePicker();
    };

    useEffect(() =>{
        setDateSelected(dateSelected);
    }, [dateSelected])


    const image = require('../images/image.png');
    
    return (
        <View style={styles.contentContainer}>
           
            <Text  style={{
                    fontSize: 20,
                    fontFamily:'Bold',
                    alignSelf: "center",
                    marginTop:50
                    
                }}
                >Create Event </Text>
            <View style={styles.inputContainer}>
                <Input
                    label = 'Event Title:'
                    placeholder='Name of Event'
                    
                    leftIcon={
                        <Icon
                            name='mail'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    
                />
                
                <Input
                    label='Location:'
                    placeholder='Event Location'
                    
                    leftIcon={
                        <Icon
                            name='enviromento'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    
                    
                />

                <Input
                    label='Primary Contact:'
                    placeholder="Contact's name"
                    
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    
                />
                <TouchableOpacity onPress={() => [ showDatePicker()]}>
                    <Input
                        label='Date:'
                        placeholder="Event Date"
                        editable={false}
                        value={dateSelected}
                        
                        leftIcon={
                            <Icon
                                name='calendar'
                                size={24}
                                color='black'
                                style={styles.icon}
                            />
                        }
                        
                    />
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                <TouchableOpacity >
                <Input
                    label='Time:'
                    placeholder="Event Start Time"
                    editable={false}
                    onP
                    
                    leftIcon={
                        <Icon
                            name='clockcircleo'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    
                />
                </TouchableOpacity>

                <Input
                    label='Description:'
                    placeholder='Event Description'
                    
                    leftIcon={
                        <Icon
                            name='info'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button style={styles.smallButton}  title="Create Event" 
                
                />
            </View>
        </View>
        
    )
}
/*
const validate_Field=(email, password, verifypass)=>{
    if(email==""){
        alert("Please enter an email address")
        return false
    }
    else if (password!=verifypass){
        alert("The password you entered does not match")
        return false
    }
    else if (password==""){
        alert("Please enter a password")
        return false
    }
    else if (verifypass==""){
        alert("Please re-enter password")
        return false
    }
    return true
}
*/

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor:"#fff7d5",
        flex: 1,
        alignItems: 'center',
        justifyContent:'space-evenly',
        paddingTop: 50

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
        justifyContent:'space-around',
        height: '40%',
    },
    smallButton: {
    },
    icon: {
        marginRight: 15
    }
})

export default CreateEvent;
// https://www.npmjs.com/package/react-native-modal-datetime-picker