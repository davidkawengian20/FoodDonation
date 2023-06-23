import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import {Background, BackgroundSignIn} from '../../assets/images';
import {Gap, Button} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

const ChangePassword = ({ navigation,route}) => {
  const { jsonData } = route.params;
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  // set oldPass and newPass to empty string on screen focus
  useFocusEffect(
    React.useCallback(() => {
      setOldPass('');
      setNewPass('');
    }, [])
  );

  
  const handleSignIn = () => {
    // check if old pass and new pass are not empty or only spaces
    if (!oldPass.trim() && !newPass.trim()) {
      Alert.alert('Error Message', 'Input old password and new password fields cannot be empty or contain only spaces.');
      return;
    }

    if (oldPass === newPass) {
      Alert.alert('Error Message', 'Input password fields must be different from the previous one.');
      return;
    }

    if (!oldPass.trim()) {
      Alert.alert('Error Message', 'Input old password field cannot be empty or contain only spaces.');
      return;
    }

    if (!newPass.trim()) {
      Alert.alert('Error Message', 'Input new password field cannot be empty or contain only spaces.');
      return;
    }

    // create request body with email and password input values
    const requestBody = {
      'input-old-password': oldPass,
      'input-new-password': newPass,
      'email-user': jsonData[0].email,
    };

    // Time out request data
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out.'));
      }, 5000); // 5000 (5 detik)
    });

    Promise.race([
      fetch('103.31.38.183/foodDonation/public/mobile/changepassword', {
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
          Alert.alert('Error Message', 'Sorry, change password failed. Please try again.');
          return;
        }
        
        // check if textData contains "INCORRECT"
        if (textData.includes("INCORRECT")) {
          // handle INCORRECT case
          Alert.alert('Error Message', 'Sorry, you put incorrect old password. Please try again.');
          return;
        }

        if (textData.includes("SUCCESS")) {
          
          Alert.alert('Password Changed', 'Student password has been changed successfully. Please sign in with the new password.');
          // redirect to SignInScreen on successful change password
          navigation.navigate('SignIn');
        }
      })
      .catch(error => {
        //console.error(error);
        Alert.alert('Error Message', error.message);
        return;
      });
  }

   return (
    <SafeAreaView style={styles.container}>
      {/* <Image source={BackgroundSignIn} style={styles.backgroundImage} /> */}
      <MaterialCommunityIcons name="onepassword" size={100} color="#D7E9B9" style={{paddingBottom:70}} />

      <View style={styles.inputall}>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Old Password</Text>
          <MaterialCommunityIcons name="lock-alert-outline" color="#F2E3DB" size={20} style={styles.icon} />
          <TextInput
          placeholder="123abcxxx.com"
            style={styles.input}
            onChangeText={setOldPass}
            value={oldPass}
            caretColor="red"
          />
          
        </View>
        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>New Password</Text>
          <MaterialCommunityIcons name="lock-reset" color="#F2E3DB" size={20} style={styles.icon} />
          <TextInput
          placeholder="12abcxx"
            style={styles.input}
            onChangeText={setNewPass}
            value={newPass}
            secureTextEntry={true}
          />
        </View>

        <Gap height={20} />
        <Button
          title="Change Password"
          color="#85A389"
          textColor="#1A4D2E"
          onPress={handleSignIn}
        />
          {/* <Gap height={10} /> */}
          {/* <Button
            title="Register"
            color="transparent"
            textColor="white"
            onPress={goSignIn}
          /> */}
          </View>
        </View>
      </SafeAreaView>
  );
};

export default ChangePassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#41644A'
  },
  inputContainer: {
    height: '100%',
    width: '90%',
    paddingTop:50,
    paddingHorizontal: 10,
    
  },
  inputall:{
    backgroundColor:'#263A29',
    height:'40%',
    width:'90%',
    paddingLeft:25,
    padding:0,
    borderRadius: 10,
    paddingBottom:20,
    
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
  // backgroundImage: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  //   resizeMode: 'cover',
  // },
});