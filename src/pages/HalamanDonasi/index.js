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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const HalamanDonasi = ({navigation}) => {
     const goSignIn = () => {
      navigation.navigate('SignIn');
  } 
    const [detailJemputan, setDetailJemputan] = useState('');
    const [jamMasak, setJamMasak] = useState('');
    const [perkiraanKadarluarsa, setPerkiraanKadarluarsa] = useState('');
    const [jenisMakanan, setJenisMakanan] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const handleSignUp = () => {
        // check if input fields are not empty or only spaces
        if (!detailJemputan.trim() || !jamMasak.trim() || !perkiraanKadarluarsa.trim() || !jenisMakanan.trim() || !keterangan.trim() ) {
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
          'input-detail_jemputan': detailJemputan,
          'input-jam_masak': jamMasak,
          'input-perkiraan_kadaluarsa': perkiraanKadarluarsa,
          'input-jenis_makanan': jenisMakanan,
          'input-keterangan': keterangan,
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
    
      {/* <Image source={Backgrounds} style={styles.backgroundImage} /> */}
      
      <TouchableOpacity onPress={goSignIn}>
        <MaterialCommunityIcons name="close-box-outline" color="black" size={30} style={{padding:20, textAlign:'right'}} />
      </TouchableOpacity>
      <Text style={{left:50,fontSize:23, color:'#F86F03' ,paddingBottom:40}}>Detail Donasi Makanan</Text>
      

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Detail Penjemputan</Text>
          <Entypo name="location" color="#FFBF9B" size={20} style={styles.icon} />
          <TextInput
            placeholder="Depan Rumah Makan"
            style={styles.input}
            onChangeText={setDetailJemputan}
            value={detailJemputan}
            caretColor="red"
          />
        </View>
        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Jam berapa dimasak?</Text>
          <MaterialCommunityIcons name="timeline-help" color="#FFBF9B" size={20} style={styles.icon} />
          <TextInput
            placeholder="12.00 WITA"
            style={styles.input}
            onChangeText={setJamMasak}
            value={jamMasak}
          />
        </View>

        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Perkiraan Kadarluasa</Text>
          <FontAwesome5 name="business-time" color="#FFBF9B" size={20} style={styles.icon} />
          <TextInput
            placeholder="20.00 WITA"
            style={styles.input}
            onChangeText={setPerkiraanKadarluarsa}
            value={perkiraanKadarluarsa}
          />
        </View>

        <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>Jenis Makanan</Text>
          <MaterialCommunityIcons name="food" color="#FFBF9B" size={20} style={styles.icon} />
          <TextInput
            placeholder="nasi, ikan, sayur"
            style={styles.input}
            onChangeText={setJenisMakanan}
            value={jenisMakanan}
          />
          <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={styles.textInput}>ket tambahan</Text>
          <MaterialCommunityIcons name="text-box-plus-outline" color="#FFBF9B" size={20} style={styles.icon} />
          <TextInput
            placeholder="saus sudah dicampur"
            style={styles.input}
            onChangeText={setKeterangan}
            value={keterangan}
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
        <Button title="Confirm" color="#FC6E51" textColor="white" onPress={handleSignUp} />
      </View>
    </SafeAreaView>
  );
}

export default HalamanDonasi

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F6BA6F'
  },
  // backgroundImage: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  //   resizeMode: 'cover',
  // },
  
  
  
  inputContainer: {
    height: '70%',
    width: '95%',
    marginTop:20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    top:-15,
    backgroundColor:'#7C9070',
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
    paddingHorizontal:15,
    
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