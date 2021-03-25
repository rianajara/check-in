import * as React from 'react';
import { Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { Header, Left, Right, Body, Button } from 'native-base';
import Constants from 'expo-constants';

import IconComponent from '@Components/Icon';
/**
 * @param {Function} rightButtonOnPress
 */
const HeaderTitleComponent = ({ title, titleTextStyle }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <Text
        style={[
          {
            textAlign: 'center',
            color: '#fefefe',
            fontSize: 19,
            fontFamily: 'Bold',
            fontWeight: 'bold',
          },
          titleTextStyle,
        ]}>
        {title}
      </Text>
    </View>
  );
};

HeaderTitleComponent.propTypes = {};

HeaderTitleComponent.defaultProps = {
  rightTitle: undefined,
};

export default HeaderTitleComponent;
