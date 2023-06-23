import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import {Backgrounds, Close, ProfilePic, UploadRegis} from '../../assets/images';
import {Gap, Button} from '../../components';
import authentication, {db} from '../../config/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {ref as r, getDatabase, child, get, update} from 'firebase/database';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SignIn from '../SignIn';

const InputWKM = ({navigation}) => {
     const SignIn = () => {
      navigation.navigate('SignIn');
  } 

  const [keluarga, setKeluarga] = useState('');
  const [koordinatLat, setKoordinatLat] = useState('');
  const [koordinatLong, setKoordinatLong] = useState('');
  const [agama, setAgama] = useState('');
    
    const handleCreateAccount = () => {
        // check if input fields are not empty or only spaces
        if (!keluarga.trim() || !koordinatLat.trim() || !koordinatLong.trim() || !agama.trim()) {
          Alert.alert('Empty Input Field', 'Check again, all fields cannot be empty or contain only spaces.');
          return;
        }
        
        // check if email format is valid
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     Alert.alert('Error Message', 'Invalid email format.');
        //     return;
        // }
        // if (password !== repassword) {
        //     Alert.alert('Student Password', 'Please re-type the same password.');
        //     return;
        // }
      
        // if (password !== repassword) {
        //     Alert.alert('Student Password', 'Passwords do not match. Please enter the same password in both fields.');
        //     return;
        // } 
          
        // if (password.length < 8 || repassword.length < 8) {
        //     Alert.alert('Student Password', 'Password length must be at least 8 characters.');
        //     return;
        // }
          
        // create request body with email and password input values
        const requestBody = {
          'input-keluarga': keluarga,
          'input-koordinatLat': koordinatLat,
          'input-koordinatLong': koordinatLong,
          'input-agama': agama,
          
        };
    


        // Time out request data
        const timeoutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error('Request timed out.'));
          }, 5000); // 5000 (5 detik)
        });
    
        Promise.race([
          fetch('http://103.31.38.183/foodDonation/public/mobile/register', {
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
              Alert.alert('Error Message', 'Sorry, create new account failed. Please try again.');
              return;
            }
            
            // check if textData contains "INCORRECT"
            if (textData.includes("DUPLICATE")) {
              // handle INCORRECT case
              Alert.alert('Error Message', 'Sorry, duplicate email/nim/reg.number were found in database. Please contact the administrator.');
              return;
            }
            
            if (textData.includes("SUCCESS")) {
              // message
              Alert.alert('User Account', 'New account of the student was created successfully.');
              
              // Set empty field
              setKeluarga('');
              setKoordinat('');
              setAgama('');
              
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
      {/* <Image source={Backgrounds} style={styles.backgroundImage} /> */}
      <TouchableOpacity onPress={SignIn}>
        <MaterialCommunityIcons name="close-box-outline" color="black" size={30} style={{padding:20, textAlign:'right'}} />
      </TouchableOpacity>
      <MaterialCommunityIcons name="playlist-plus" color="#F1C376" size={120} style={{alignSelf:'center'}} />

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Keluarga</Text>
          <MaterialIcons name="family-restroom" color="#F7E6C4" size={20} style={styles.icon} />
          <TextInput
            placeholder="Kel. famxx"
            style={styles.input}
            onChangeText={setKeluarga}
            value={keluarga}
            caretColor="red"
            />
        </View>

        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>KoordinatLat</Text>
          <MaterialIcons name="my-location" color="#F7E6C4" size={20} style={styles.icon} />
          <TextInput
            placeholder="12341.1231.xxx"
            style={styles.input}
            onChangeText={setKoordinatLat}
            value={koordinatLat}
            secureTextEntry={true}
          />
        </View>

        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>KoordinatLong</Text>
          <MaterialIcons name="my-location" color="#F7E6C4" size={20} style={styles.icon} />
          <TextInput
            placeholder="12341.1231.xxx"
            style={styles.input}
            onChangeText={setKoordinatLong}
            value={koordinatLong}
            secureTextEntry={true}
          />
        </View>

        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Agama</Text>
          <MaterialCommunityIcons name="settings-helper" color="#F7E6C4" size={20} style={styles.icon} />
          <TextInput
            placeholder="Muslim, Advent, Kristens"
            style={styles.input}
            onChangeText={setAgama}
            value={agama}
          />
        </View>

        <Gap height={20} />
        <Button title="Input" color="#F1C376" textColor="white" onPress={handleCreateAccount} />
      </View>
    </SafeAreaView>
  );
}

export default InputWKM

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF4F4',
  },
//   backgroundImage: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
  
  
  
  inputContainer: {
    height: '60%',
    width: '95%',
    marginTop:20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    top:-15,
    marginTop:60,
    backgroundColor:'#606C5D',
    borderRadius: 20,
    shadowColor: 'white',
    shadowOffset: {
    width: 0,
    height: 2,
    },
    
    
  },
  textInput: {
    color:'#fff',
    marginLeft:-10,
    fontSize: 20,
    padding:0,
    fontWeight: 'bold',
    top:5,
    paddingHorizontal:15
  },
  
  input: {
    color:'#FEFF86',
    fontSize:20,
    height: 30,
    margin: 0,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    top:-15,
    paddingHorizontal:15
  },
  icon:{
    textAlign:'right'
  },
  uploadStyle:{
    marginLeft: 10,
  }
});