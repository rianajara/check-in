import * as React from 'react';
import { Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { Header, Left, Right, Body, Button } from 'native-base';
import Constants from 'expo-constants';

import IconComponent from '@Components/Icon';
/**
 * @param {Function} rightButtonOnPress
 */
const HeaderRightComponent = (props) => {
  const { rightImage, rightTitle, rightImageStyle, rightButtonOnPress } = props;
  return (
    <>
      {rightImage != undefined && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            paddingVertical: 7,
            height: 45,
          }}>
          <TouchableOpacity
            style={{
              marginRight: 13,
              flex: 1,
              paddingHorizontal: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={rightButtonOnPress}>
            <IconComponent
              name={rightImage}
              style={[{ width: 22.7, height: 23.7 }, rightImageStyle]}
            />
          </TouchableOpacity>
        </View>
      )}

      {rightTitle != undefined && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            paddingVertical: 7,
            height: 45,
          }}>
          <TouchableOpacity
            style={{
              borderColor: 'white',
              marginRight: 11,
              borderRadius: 5,
              flex: 1,
              paddingHorizontal: 24.5,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e2e2e2',
            }}
            onPress={rightButtonOnPress}>
            <Text style={{ fontSize: 12, color: '#fff' }}>{rightTitle}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

HeaderRightComponent.propTypes = {};

HeaderRightComponent.defaultProps = {
  rightButtonOnPress: () => {},
  rightTitle: undefined,
  rightImage: undefined,
  rightImageStyle: {},
};

export default HeaderRightComponent;
