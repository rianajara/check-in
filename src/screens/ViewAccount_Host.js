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

const viewHost = (props) => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	//connect to firebase somehow (?)
	const firstName = currentUser['hostFirstName'];
	const lastName = currentUser['hostLastName'];
	const email = currentUser['hostEmail'];
	const organization = currentUser['hostOrganization']
	const uniqueID = currentUser['hostUniqueID']


	const switchPage = () => {
		setTimeout(() => {
			props.navigation.navigate('ViewAccount_Attendee');
		}, 750);
	};

	return (
      
		//organization information
		<View style={styles.contentContainer} >
			
			<Text
				style={{
					fontSize: 20,
					fontFamily: 'Bold',
					alignSelf: 'center',
					marginTop: 50,
				}}>
				 Organization Host Information{' '}
				 
			</Text>
			<ScrollView >

				<View style={styles.textContainer}>

					<Text style ={styles.biggerFont}> {'Organization:'} </Text>

			
					<Text styles = {styles.smallerFont}>
							{'  '}
           					<Icon // email text
               			 		name='mail'
                				size={20}
               			   		color='black'
               			    	style={styles.icon}
							/>
                    
						{ ' '+ organization + '\n' }
					</Text>
				
			

					<Text style ={styles.biggerFont}> {'First Name:'} </Text>

					<Text styles = {styles.smallerFont}>
							{'  '}
           					<Icon // organization text
               			 		name='addusergroup'  
                				size={20}
               			   		color='black'
               			    	style={styles.icon}
							/>
                    
						{ ' '+ firstName + '\n' }
					</Text>

					<Text style ={styles.biggerFont}> {'Last Name:'} </Text>

					<Text styles = {styles.smallerFont}>
							{'  '}
           					<Icon // organization text
               			 		name='addusergroup'  
                				size={20}
               			   		color='black'
               			    	style={styles.icon}
							/>
                    
						{ ' '+ lastName + '\n' }
					</Text>

					<Text style ={styles.biggerFont}> {'Unique ID:'} </Text>

					<Text styles = {styles.smallerFont}>
							{'  '}
           					<Icon // organization text
               			 		name='addusergroup'  
                				size={20}
               			   		color='black'
               			    	style={styles.icon}
							/>
                    
						{ ' '+ uniqueID + '\n' }
					</Text>

					<Text style ={styles.biggerFont}> {'Email:'} </Text>

					<Text styles = {styles.smallerFont}>
							{'  '}
           					<Icon // organization text
               			 		name='addusergroup'  
                				size={20}
               			   		color='black'
               			    	style={styles.icon}
							/>
                    
						{ ' '+ email + '\n' }
					</Text>


     

            

            	</View>
			</ScrollView>

			
			<View style={styles.buttonContainer}>
				<Button //modify attendee button
					style={styles.smallButton}
					title='Edit Info'
					onPress ={()=>props.navigation.navigate('ModifyHost')}
						
					
				/>
			</View>
		
		</View>
	);
};





const styles = StyleSheet.create({
	contentContainer: {
		backgroundColor: '#fff7d5',
		flex: 1,
		
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

export default viewHost;


