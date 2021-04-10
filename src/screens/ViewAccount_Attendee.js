import React from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	KeyboardAvoidingView,
	StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from '@expo/vector-icons/AntDesign';
import ViewAccount_Attendee from './ViewAccount_Attendee';
import Firebase from '../components/Firebase';
import * as firebase from 'firebase';
import PopUpModal from '../components/PopUpModal';
import InfoDropDown from '../components/InfoDropDown';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';

const viewAttendee = (props) => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	//connect to firebase somehow (?)
	const firstName = currentUser['attendeeFirstName'];
	const lastName = currentUser['attendeeLastName'];
	const email = currentUser['attendeeEmail'];
	const major = currentUser['attendeeMajor'];
	const yearLevel = currentUser['attendeeYearLevel'];

/*
	const switchPage = () => {
		setTimeout(() => {
			props.navigation.navigate('ViewAccount_Attendee');
		}, 750);
	};
*/
	return (
      
		//attendee information
		<View style={styles.contentContainer} >
			
			<Text
				style={{
					fontSize: 20,
					fontFamily: 'Bold',
					alignSelf: 'center',
					marginTop: 50,
				}}>
				 Attendee Information{' '}
				 
			</Text>
			<ScrollView >

				<View style={styles.textContainer}>

					<Text style ={styles.biggerFont}> {'Name:'} </Text>



					<Text styles = {styles.smallerFont}>
							{'  '}
           					<Icon //first name and last name
               			 		name='user'
                				size={20}
               			   		color='black'
               			    	style={styles.icon}
							/>
                    
						{ ' '+ firstName + ' ' + lastName + '\n' }
					</Text>


					

  


					<Text style ={styles.biggerFont}> {'Email:'} </Text>

			
					<Text styles = {styles.smallerFont}>
							{'  '}
           					<Icon //email
               			 		name='mail'
                				size={20}
               			   		color='black'
               			    	style={styles.icon}
							/>
                    
						{ ' '+ email + '\n' }
					</Text>
				
			

					<Text style ={styles.biggerFont}> {'Major:'} </Text>

					<Text styles = {styles.smallerFont}>
							{'  '}
           					<Icon //major
               			 		name='file-markdown'  
                				size={20}
               			   		color='black'
               			    	style={styles.icon}
							/>
                    
						{ ' '+ major + '\n' }
					</Text>

					<Text style ={styles.biggerFont}> {'Year Level:'} </Text>



					<Text styles = {styles.smallerFont}>
							{'  '}
           					<Icon //year level
               			 		name='book' 
                				size={20}
               			   		color='black'
               			    	style={styles.icon}
							/>
                    
						{ ' '+ yearLevel + '\n' }
					</Text>

            

            	</View>
			</ScrollView>

			
			<View style={styles.buttonContainer}>
				<Button //modify attendee button
					style={styles.smallButton}
					title='Edit Info'
					onPress ={()=>props.navigation.navigate('ModifyAttendee')}
						
					
				/>
			</View>
		
		</View>
	);
};





const styles = StyleSheet.create({
	contentContainer: {
		backgroundColor: '#fff7d5',
		flex: 1,
		//alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	smallImage: {
		marginTop: 60,
		width: 200,
		height: 200,
	},
	textContainer: {

        alignItems: 'flex-start',
        marginLeft: '10%',
	

        marginTop: 20,
        justifyContent:'space-evenly',
	},
	buttonContainer: {
        alignItems: 'center',
		justifyContent: 'space-around',
		height: '17%',
	},
	smallButton: {},
	icon: {
		marginRight: 15,
	},

	biggerFont:{
		fontSize: 20,
	},

	smallerFont:{
		fontSize: 15,
		
	},
    
});

export default viewAttendee;


