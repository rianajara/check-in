import React, { createContext, useState } from 'react';

// Context or Information that will be passed down to needed components
export const UserContext = createContext({
	setUser: () => {},// method used to set the current user that is logged in
	loggedInUser: 'none',// object to hold all of the current logged in user information set by the setUser method
});

//Provides the other components with the UserContext information
export const UserProvider = (props) => {
	const [currentUser, setCurrentUser] = useState("noone");

	return (
		<UserContext.Provider value={{currentUser, setCurrentUser}}>
			{props.children}
		</UserContext.Provider>
	);
};