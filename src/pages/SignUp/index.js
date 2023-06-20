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

const SignUp = ({navigation}) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [Nomor, setNomor] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(re => {
        console.log(re);
        update(r(db, `User/${authentication.currentUser.uid}`), {
          Nama :nama,
          Email: email,
          Address: address,
          Nomor:Nomor
        });
        Alert.alert('Success!', 'You are now registered');
        setTimeout(() => {
          navigation.navigate('SignIn');
        }, 2000); // Add a 2-second (2000 milliseconds) delay before navigating
      })
      .catch(error => {
        Alert.alert('Alert!', error.message);
        console.log('Error:', error.message);
      });
  }
  
  const goSignIn = () => {
    navigation.navigate('SignIn');
  } 
  return (
    <SafeAreaView style={styles.container}>
      <Image source={Backgrounds} style={styles.backgroundImage} />
      
      <TouchableOpacity onPress={goSignIn}>
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
          <Text style={styles.textInput}>username(RM. )</Text>
          <MaterialCommunityIcons name="home-account" color="#FC6E51" size={20} style={styles.icon} />
          <TextInput
            placeholder="Rm. aunxxx"
            style={styles.input}
            onChangeText={setNama}
            value={nama}
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
          <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Nomor(tlpn/WA)</Text>
          <FontAwesome name="whatsapp" color="green" size={20} style={styles.icon} />
          <TextInput
            placeholder="089123xx"
            style={styles.input}
            onChangeText={setNomor}
            value={Nomor}
          />

          

        </View>
        </View>
        {/* <Gap height={10} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Foto</Text>
          <Gap height={5} />
          <Image source={UploadRegis} style={styles.uploadStyle} />
        </View> */}
        <Gap height={20} />
        <Button title="Register" color="#F7941D" textColor="white" onPress={handleSignUp} />
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
    height: '70%',
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