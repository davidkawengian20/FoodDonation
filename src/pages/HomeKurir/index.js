import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, BackHandler, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigationState } from '@react-navigation/native'
import { home1, } from '../../assets'  
import {
  ref as r,
  onValue,
  off,
  getDatabase,
  child,
  get,
  update,
  set,
} from 'firebase/database';

const HomeKurir = ({navigation, route}) => {

  // cara mendapatkan data dari parameter
  const {jsonData} = route.params;

  console.log("sekarang ada di Home Kurir");
  console.log(jsonData);

  const db = getDatabase();
  // const uid = route.params.uid;
  const [nama, setNama] = useState('');
  
  const fetchUserDataRealtime = () => {
    const userRef = r(db, `User/${uid}`);
    const onValueChange = onValue(
      userRef,
      snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setNama(userData.Nama);
          } else {
          console.log('No data available for the user.');
        }
      },
      error => {
        console.error('Error fetching user data:', error);
      },
    );
    
    // Cleanup function to remove the listener when the component is unmounted
    return () => off(userRef, 'value', onValueChange);
  };
  // useEffect(() => {
  //   if (uid) {
  //     fetchUserDataRealtime();
  //   }
  // }, [uid]);

  const list = () => {
    navigation.navigate ('HomeAdmin')
  }
  const signIn = () => {
    navigation.navigate ('SignIn')
  }
  const ChangePassword= () => {
    navigation.navigate ('ChangePassword')
  }
  const akun = () => {
    navigation.navigate('ProfileDonatur')
        {navigation.navigate('ProfileDonatur', {uid: uid})
        }
        
  }
  const home = () => {
    navigation.navigate ('HalamanKurir')
  }
  
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headercontainer}>
      <Text style={{color:'#fff'}}>Kurir</Text>
      {/* <Text style={styles.headerText}>{`${nama}`}</Text> */}
      <Text style={styles.headerText}>David Kaw</Text>
      </View>
      
      <Text style={{textAlign:'center',color:'black',color:'#112B3C', fontSize:25,  alignSelf:'center', paddingBottom:0, paddingTop:40}}>Want to Share Food?</Text>
    
        <Text style={{textAlign:'center', paddingBottom:60, color:'#606C5D', paddingHorizontal:50}}>
          Ayo!, bantu Rumah makan memberikan Donasi untuk yang membuthkan 
        </Text>
      <View style={styles.content}>
      <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={home} >
          <MaterialCommunityIcons name="format-list-group" size={40} color="#B31312"/>
          <Text style={styles.menuItemText}>Donasi    Masuk</Text>
        </TouchableOpacity>
        {/* <Text style={styles.menuItemKet}>jangan lupa update WKM!</Text> */}
        </View>

        <View style={styles.menuContainer}>
        <TouchableOpacity title style={styles.menuItem} onPress={akun} >
          <FontAwesome name="drivers-license-o" size={40} color="#B31312" />
          <Text style={styles.menuItemText}>Profile</Text>
        </TouchableOpacity>
        {/* <Text style={styles.menuItemKet}>WKM siap</Text> */}
          </View>
          
        <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={ChangePassword} >
          <MaterialCommunityIcons name="onepassword" size={40} color="#B31312" />
          <Text style={styles.menuItemText}>Change Password</Text>
        </TouchableOpacity>
        {/* <Text style={styles.menuItemKet}>menu untuk anda mengubah password</Text> */}
          </View>
          

        <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={signIn} >
          <MaterialCommunityIcons name="location-exit" size={40} color="#B31312" />
          <Text style={styles.menuItemText}>Exit</Text>
        </TouchableOpacity>
        {/* <Text style={styles.menuItemKet}>menu untuk keluar halaman dan kembali ke login</Text> */}
        </View>       
        </View>
        
      </View>
  )
}

export default HomeKurir

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#EEE2DE',
  },
  headercontainer: {
    backgroundColor: '#2B2A4C',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'left',
    
  },
  menuItem: {
    width: '100%',
    height: 105,
    margin:0,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor:'#fff',
    shadowColor: 'black',
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
    
  menuItemText: {
      color: '#EA906C',
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  menuItemKet: {
    color:'#D61C4E',
    textAlign:'center',
    marginHorizontal:0,
    
    alignSelf:'center'

  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 60,
    marginTop: 0,
    },
    menuContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
    marginBottom: 10,
    paddingBottom:20
  },


})
