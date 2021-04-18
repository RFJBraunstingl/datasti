import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// @ts-ignore
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './screens/RootStackParamList';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none" initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
