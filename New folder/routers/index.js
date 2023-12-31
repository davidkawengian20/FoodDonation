import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SplashScreen,
  SignIn,
  SignUp,
  HomeDonatur,
  HomeKurir,
  HomeAdmin
} from '../pages';

const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeDonatur"
        component={HomeDonatur}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeKurir"
        component={HomeKurir}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeAdmin"
        component={HomeAdmin}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default index;
