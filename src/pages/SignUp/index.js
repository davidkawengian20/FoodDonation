import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import {Backgrounds, Close, ProfilePic, UploadRegis} from '../../assets/images';
import {Gap, Button} from '../../components';
import authentication, {db} from '../../config/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {ref as r, getDatabase, child, get, update} from 'firebase/database';

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
        <Image source={Close} style={styles.closeImage} />
      </TouchableOpacity>
      <Image source={ProfilePic} style={styles.profileImage} />
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            caretColor="red"
          />
        </View>
        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
        </View>

        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>username(RM. )</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNama}
            value={nama}
          />
        </View>

        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
          />
          <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Nomor(tlpn/WA)</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNomor}
            value={Nomor}
          />

          

        </View>
        </View>
        <Gap height={10} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Foto</Text>
          <Gap height={5} />
          <Image source={UploadRegis} style={styles.uploadStyle} />
        </View>
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
  closeImage: {
    width: 45,
    height: 45,
    alignSelf: 'flex-end',
    margin: 30,
  },
  profileImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    top:-20,
  },
  inputContainer: {
    height: '70%',
    width: '80%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    top:-15
  },
  textInput: {
    marginLeft:-15,
    fontSize: 20,
    padding:-10,
    fontWeight: 'bold',
    top:-15
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
  uploadStyle:{
    marginLeft: 10
  }
});