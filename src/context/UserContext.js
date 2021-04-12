import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



// Context or Information that will be passed down to needed components
export const UserContext = createContext({
	setUser: () => {},// method used to set the current user that is logged in
	loggedInUser: 'none',// object to hold all of the current logged in user information set by the setUser method
});

//Provides the other components with the UserContext information
export const UserProvider = (props) => {
	const [currentUser, setCurrentUser] = useState();

	const loadData = async () => {
		let user = await AsyncStorage.getItem('currentUser')
		if(user === null){// completely logged out
			//console.warn("no logged in user ")
		}else if(user !== null){
		
			setCurrentUser(JSON.parse(user))
		}
		
	}

	useEffect(() => {
		
		loadData()
		
	}, [])
	return (
		<UserContext.Provider value={{currentUser, setCurrentUser}}>
			{props.children}
		</UserContext.Provider>
	);
};