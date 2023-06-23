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
import SignIn from '../SignIn';

const SignUp = ({navigation}) => {
     const SignIn = () => {
      navigation.navigate('SignIn');
  } 

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [nomor, setNomor] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    
    const handleCreateAccount = () => {
        // check if input fields are not empty or only spaces
        if (!name.trim() || !email.trim() || !address.trim() || !nomor.trim() || !password.trim() || !repassword.trim()) {
          Alert.alert('Empty Input Field', 'Check again, all fields cannot be empty or contain only spaces.');
          return;
        }
        
        // check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error Message', 'Invalid email format.');
            return;
        }
        if (password !== repassword) {
            Alert.alert('Student Password', 'Please re-type the same password.');
            return;
        }
      
        if (password !== repassword) {
            Alert.alert('Student Password', 'Passwords do not match. Please enter the same password in both fields.');
            return;
        } 
          
        if (password.length < 8 || repassword.length < 8) {
            Alert.alert('Student Password', 'Password length must be at least 8 characters.');
            return;
        }
          
        // create request body with email and password input values
        const requestBody = {
          'input-email': email,
          'input-password': password,
          'input-username': name,
          'input-address': address,
          'input-nomor': nomor,
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
              navigation.navigate('SignIn');
              
              // Set empty field
              setName('');
              setEmail('');
              setAddress('');
              setNomor('');
              setPassword('');
              setRePassword('');
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
      <Image source={Backgrounds} style={styles.backgroundImage} />
      
      <TouchableOpacity onPress={SignIn}>
        <MaterialCommunityIcons name="close-box-outline" color="black" size={30} style={{padding:20, textAlign:'right'}} />
      </TouchableOpacity>
      <EvilIcons name="user" color="#025464" size={120} style={{alignSelf:'center'}} />

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Email</Text>
          <MaterialCommunityIcons name="email" color="#FC6E51" size={20} style={styles.icon} />
          <TextInput
            placeholder="xx@gmail.com"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            caretColor="red"
            />

        </View>
        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Password</Text>
          <MaterialCommunityIcons name="shield-lock-outline" color="#FC6E51" size={20} style={styles.icon} />
          <TextInput
            placeholder="1abc*#xx"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Confirm Password</Text>
          <MaterialCommunityIcons name="shield-lock-outline" color="green" size={20} style={styles.icon} />
          <TextInput
            placeholder="089123xx"
            style={styles.input}
            onChangeText={setRePassword}
            value={repassword}
            secureTextEntry={true}
          />
        </View>

        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>username(RM. )</Text>
          <MaterialCommunityIcons name="home-account" color="#FC6E51" size={20} style={styles.icon} />
          <TextInput
            placeholder="Rm. aunxxx"
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
        </View>

        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Address</Text>
          <Entypo name="address" color="#FC6E51" size={20} style={styles.icon} />
          <TextInput
            placeholder="Airmadidi. (dekat alfxxx)"
            style={styles.input}
            onChangeText={setAddress}
            value={address}
          />
           </View>
          <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Nomor(tlpn/WA)</Text>
          <FontAwesome name="whatsapp" color="green" size={20} style={styles.icon} />
          <TextInput
            placeholder="089123xx"
            style={styles.input}
            onChangeText={setNomor}
            value={nomor}
          />
        </View>

         



        {/* <Gap height={10} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Foto</Text>
          <Gap height={5} />
          <Image source={UploadRegis} style={styles.uploadStyle} />
        </View> */}
        <Gap height={20} />
        <Button title="Register" color="#F7941D" textColor="white" onPress={handleCreateAccount} />
      </View>
    </SafeAreaView>
  );
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  
  
  inputContainer: {
    height: '78%',
    width: '95%',
    marginTop:20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    top:-15,
    backgroundColor:'#025464',
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
    fontSize: 15,
    padding:0,
    fontWeight: 'bold',
    top:5,
    paddingHorizontal:15
  },
  
  input: {
    color:'#FEFF86',
    fontSize:15,
    height: 30,
    margin: 0,
    borderWidth: 1,
    borderColor:'grey',
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