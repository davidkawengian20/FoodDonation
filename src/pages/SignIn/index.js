import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import authentication, {db} from '../../config/firebase';
import {getDatabase, ref as r, get, set, update} from 'firebase/database';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {Background, BackgroundSignIn} from '../../assets/images';
import {Gap, Button} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import SignUp from '../SignUp';
import HomeKurir from '../HomeKurir';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goSignIn = () => {
      navigation.navigate('HomeKurir');
  } 
  
    // set email and password to empty string on screen focus
    useFocusEffect(
      React.useCallback(() => {
        setEmail('');
        setPassword('');
      }, [])
    );

    const handleSignIn = () => {
      // check if email and password are not empty or only spaces
      if (!email.trim() && !password.trim()) {
        Alert.alert('Error Message', 'Input email and password fields cannot be empty or contain only spaces.');
        return;
      }
  
      if (!email.trim()) {
        Alert.alert('Error Message', 'Input email field cannot be empty or contain only spaces.');
        return;
      }
  
      if (!password.trim()) {
        Alert.alert('Error Message', 'Input password field cannot be empty or contain only spaces.');
        return;
      }
  
      // create request body with email and password input values
      const requestBody = {
        'input-email': email,
        'input-password': password
      };

  
      // Time out request data
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'));
        }, 5000); // 5000 (5 detik)
      });
  
      Promise.race([
        fetch('http://103.31.38.183/foodDonation/public/mobile/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: Object.keys(requestBody).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(requestBody[key])}`).join('&')
        }),
        timeoutPromise
      ])
        .then(response => response.text())
        .then(textData => {
          // handle response data
          console.log(textData);
  
          // check if textData contains "ERROR"
          if (textData.includes("ERROR")) {
            // handle error case
            //console.error("Login failed:", textData);
            Alert.alert('Error Message', 'Sorry, login failed. Please try again.');
            return;
          }
  
          if (textData.includes("SUCCESS")) {
            const dataArray = textData.split("SUCCESS");
            const jsonString = dataArray[1];
  
            // to json format
            const jsonData = JSON.parse(jsonString);
            //console.log(jsonData);
  
            Alert.alert('Login Success', 'Welcome to this attendance system.');
            // redirect to HomeScreen on successful login and pass textData as parameter
            navigation.navigate('HomeDonatur', { jsonData });
          }
        })
        .catch(error => {
          //console.error(error);
          Alert.alert('Error Message', error.message);
          return;
        });
    };
  return (
    <SafeAreaView style={styles.container}>
      <Image source={BackgroundSignIn} style={styles.backgroundImage} />
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Email</Text>
          <MaterialCommunityIcons name="email-outline" color="#FC6E51" size={20} style={styles.icon} />
          <TextInput
          placeholder="daxx@gmail.com"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            caretColor="red"
          />
        </View>
        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Password</Text>
          <MaterialCommunityIcons name="lock" color="#FC6E51" size={20} style={styles.icon} />
          <TextInput
          placeholder="12abcxx"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
        </View>

        <Gap height={25} />
        <Button
          title="Login"
          color="#F7941D"
          textColor="white"
          onPress={handleSignIn}
        />
        <Gap height={10} />
        <Button
          title="Register"
          color="transparent"
          textColor="white"
          onPress={goSignIn}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    height: '30%',
    width: '80%',
    paddingHorizontal: 10,
  },
  textInput: {
    fontSize: 17,
    marginLeft:-15,
    fontWeight: 'bold',
    paddingTop:15
  },
  icon:{
    textAlign:'right'
  },
  input: {
    fontSize:20,
    height: 30,
    margin: 0,
    borderWidth: 1,
    borderColor: 'white',
    padding: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    top:-15
  },
  inputRow: {
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});