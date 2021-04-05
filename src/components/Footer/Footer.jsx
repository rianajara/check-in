import React, { useContext } from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import AppContext from '@Components/AppContext';
import Confirm from '@Components/Confirm';
import UserService from '@Services/User';
import alert from '@Components/Alert';

const Footer = ({ pushAccount }) => {
  const globalState = useContext(AppContext);

  const logout = () => {
    Confirm('Are you sure you want to log out?', (isConfirm) => {
      if (!isConfirm) return;

      globalState.logout();
    });
  };

  const deleteUser = async () => {
    const res = await UserService.deleteUser();
    if (!res) return alert('관리자에게 문의바랍니다.');

    setTimeout(() => {
      globalState.logout();
    }, 500);
  };
  return (
    <View
      style={{
        display: 'absolute',
        bottom: 30,
        left: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 30,
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f6e58d',
          paddingVertical: 20,
          borderRadius: 10,
        }}
        onPress={pushAccount}>
        <Text>Account</Text>
      </TouchableOpacity>
      <View style={{ flex: 0.2 }} />
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f6e58d',
          paddingVertical: 20,
          borderRadius: 10,
        }}
        onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>

      {
        // <TouchableOpacity
        //   style={{
        //     flex: 1,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     backgroundColor: '#f6e58d',
        //     paddingVertical: 20,
        //     borderRadius: 10,
        //   }}
        //   onPress={deleteUser}>
        //   <Text>사용자 삭제</Text>
        // </TouchableOpacity>
      }
    </View>
  );
};

export default Footer;
