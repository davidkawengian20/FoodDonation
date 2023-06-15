import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import authentication, {db} from '../../config/firebase';
import {getDatabase, ref as r, get, set, update} from 'firebase/database';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {Background, BackgroundSignIn} from '../../assets/images';
import {Gap, Button} from '../../components';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email && !password) {
      alert('Email & Password are empty');
      return;
    } else if (!email) {
      alert('Please enter your email');
      return;
    } else if (!password) {
      alert('Please enter your password');
      return;
    }
    signInWithEmailAndPassword(authentication, email, password)
      .then(async re => {
        console.log(re);
        const uid = re.user.uid;

        userRef = r(db, `User/${uid}`);

        // Show the success alert
        alert('Anda berhasil Login');
        // Delay the navigation to the appropriate home screen
        setTimeout(() => {
          navigation.navigate('HomeDonatur', {uid: uid});
        }, 2000); // Add a 2-second (2000 milliseconds) delay before navigating
      })
      .catch(error => {
        console.log('Error:', error.message);
        Alert.alert('Alert!', error.message);
      });
  };
  const goSignUp = () => {
    navigation.navigate('SignUp')
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image source={BackgroundSignIn} style={styles.backgroundImage} />
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
          onPress={goSignUp}
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
  },
  input: {
    fontSize:20,
    height: 50,
    margin: 0,
    borderWidth: 1,
    borderColor: 'white',
    padding: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
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