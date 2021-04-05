import * as React from 'react';
import { Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { Header, Left, Right, Body, Button } from 'native-base';
import Constants from 'expo-constants';

import IconComponent from '@Components/Icon';
/**
 * @param {Function} rightButtonOnPress
 */
const HeaderLeftComponent = (props) => {
  const { navigation, leftButtonOnPress } = props;
  return (
    <TouchableOpacity
      style={{ position: 'absolute', left: 0, height: 45 }}
      onPress={() =>
        leftButtonOnPress ? leftButtonOnPress() : navigation.goBack()
      }>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          height: '100%',
        }}>
        <IconComponent
          name={props.name}
          style={[{ width: 10, height: 16.5 }, props.iconStyle]}
        />
      </View>
    </TouchableOpacity>
  );
};

HeaderLeftComponent.propTypes = {};

HeaderLeftComponent.defaultProps = {
  leftButtonOnPress: undefined,
  name: 'arrow_back_white',
  iconStyle: {},
};

export default HeaderLeftComponent;
