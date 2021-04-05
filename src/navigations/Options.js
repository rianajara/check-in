import React from 'react';
import { View, Text } from 'react-native';
import {
  HeaderTitle,
  HeaderLeft,
  HeaderRight,
} from '@Components/Navigation/Header';

const defaultOption = ({
  navigation,
  route,
  title,
  headerStyle = { backgroundColor: '#fff7d5', borderBottomWidth: 0 },
}) => ({
  headerTintColor: '#fff',
  headerStyle,
  headerLeft: (props) => (
    <HeaderLeft
      navigation={navigation}
      {...props}
      name="arrow_back_black"
      iconStyle={{ width: 15.5, height: 16 }}
    />
  ),
  headerTitle: (props) => (
    <HeaderTitle {...props} title={title} titleTextStyle={{ color: '#000' }} />
  ),
  headerRight: (props) => <View></View>,
});

const defaultOption2 = ({ navigation, route, title }) => ({
  headerTintColor: 'transparent',
  headerTransparent: true,
  headerStyle: { borderBottomWidth: 0 },
  headerLeft: (props) => (
    <HeaderLeft
      navigation={navigation}
      {...props}
      name="arrow_back_black"
      iconStyle={{ width: 15.5, height: 16 }}
    />
  ),
  headerTitle: (props) => (
    <HeaderTitle {...props} title={title} titleTextStyle={{ color: '#000' }} />
  ),
  headerRight: (props) => <View></View>,
});

export { defaultOption, defaultOption2 };
