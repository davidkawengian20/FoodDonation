import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SplashScreen,
  SignIn,
  SignUp,
  HomeDonatur,
  HomeKurir,
  HomeAdmin,
  ProfileDonatur,
  HalamanDonasi,
  ChangePassword,
  InputWKM,
  Maps,
  KoordinatWKM,
  HalamanKurir,
  HalamanAdmin
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
        name="HomeKurir"
        component={HomeKurir}
        options={{headerShown: false}}
      />
      
      
    <Stack.Screen
        name="Maps"
        component={Maps}
        options={{headerShown: false}}
      />
    <Stack.Screen
        name="HomeAdmin"
        component={HomeAdmin}
        options={{headerShown: false}}
      />
    
    
    <Stack.Screen
        name="HomeDonatur"
        component={HomeDonatur}
        options={{headerShown: false}}
      />
    <Stack.Screen
        name="InputWKM"
        component={InputWKM}
        options={{headerShown: false}}
      />
    <Stack.Screen
        name="HalamanAdmin"
        component={HalamanAdmin}
        options={{headerShown: false}}
      />
    <Stack.Screen
        name="KoordinatWKM"
        component={KoordinatWKM}
        options={{headerShown: false}}
      />
    
    
    <Stack.Screen
        name="HalamanKurir"
        component={HalamanKurir}
        options={{headerShown: false}}
      />
    
    <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
    
    
    
    <Stack.Screen
        name="HalamanDonasi"
        component={HalamanDonasi}
        options={{headerShown: false}}
      />
    <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileDonatur"
        component={ProfileDonatur}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
};

export default index;
