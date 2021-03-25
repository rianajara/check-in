import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
// import Splash from '@Screens/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator, HomeNavigator } from '@Navigations';
import AppContext from '@Components/AppContext';
import Spinner from 'react-native-loading-spinner-overlay';

function Setup(props) {
  const navigationRef = useRef();

  const globalState = useContext(AppContext);

  useEffect(() => {
    if (globalState.auth.loading) return;
    // if (globalState.auth.isLoggedIn) {
    // 	props.changeRoot('home');
    // } else {
    // 	props.changeRoot('signIn');
    // }
  }, [globalState.auth.isLoggedIn, globalState.auth.loading]);

  // if (globalState.auth.loading) return <Splash />;

  useEffect(() => {}, [globalState.auth.isLoggedIn]);

  return (
    <>
      <Spinner visible={globalState.loading} />
      <NavigationContainer
        ref={navigationRef}
        //onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
        onStateChange={() => {
          const route = navigationRef.current.getCurrentRoute();
          // if (props.routeName != route.name) {
          // 	props.changeRoot(route.name);
          // }
        }}>
        {!globalState.auth.loading && globalState.auth.isLoggedIn ? (
          <HomeNavigator
            initialRouteName={
              globalState.auth.userType === 'HOST' ? 'mainHost' : 'mainAttendee'
            }
          />
        ) : (
          <RootNavigator />
        )}
      </NavigationContainer>
    </>
  );
}
export default Setup;
