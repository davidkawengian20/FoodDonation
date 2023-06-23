import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, BackHandler, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

const HomeAdmin = ({navigation, route}) => {
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
  const akun = () => {
    navigation.navigate('ProfileDonatur')
        {navigation.navigate('ProfileDonatur', {uid: uid})
        }
        
  }
  const home = () => {
    navigation.navigate ('HalamanDonasi')
  }
  const InputWKM = () => {
    navigation.navigate ('InputWKM')
  }
  const KoordinatWKM = () => {
    navigation.navigate ('KoordinatWKM')
  }
  const HalamanAdmin = () => {
    navigation.navigate ('HalamanAdmin')
  }
  
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headercontainer}>
      <Text style={{color:'#fff'}}>Administrator</Text>
      <Text style={styles.headerText}>{`${nama}`}</Text>
      </View>
      
      <Text style={{textAlign:'center',color:'black',color:'#112B3C', fontSize:25,  alignSelf:'center', paddingBottom:0, paddingTop:40}}>Want to Share Food?</Text>
    
        <Text style={{textAlign:'center', paddingBottom:60, color:'#D61C4E', paddingHorizontal:50}}>
          Ayo!, bantu Rumah makan memberikan Donasi untuk yang membuthkan 
        </Text>
      <View style={styles.content}>
      <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={InputWKM} >
          <MaterialCommunityIcons name="playlist-plus" size={40} color="#FF961D"/>
          <Text style={styles.menuItemText}>Input Data WKM</Text>
        </TouchableOpacity>
        {/* <Text style={styles.menuItemKet}>jangan lupa update WKM!</Text> */}
        </View>

        <View style={styles.menuContainer}>
        <TouchableOpacity title style={styles.menuItem} onPress={KoordinatWKM} >
          <MaterialIcons name="location-history" size={40} color="#FC6E51" />
          <Text style={styles.menuItemText}>Koordinat WKM</Text>
        </TouchableOpacity>
        {/* <Text style={styles.menuItemKet}>WKM siap</Text> */}
          </View>
          
        <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={HalamanAdmin} >
          <Ionicons name="document-text" size={40} color="#FC6E51" />
          <Text style={styles.menuItemText}>Donasi    Masuk</Text>
        </TouchableOpacity>
        {/* <Text style={styles.menuItemKet}>menu untuk anda mengubah password</Text> */}
          </View>
          

        <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={signIn} >
          <MaterialCommunityIcons name="location-exit" size={40} color="#FC6E51" />
          <Text style={styles.menuItemText}>Exit</Text>
        </TouchableOpacity>
        {/* <Text style={styles.menuItemKet}>menu untuk keluar halaman dan kembali ke login</Text> */}
        </View>       
        </View>
        
      </View>
  )
}

export default HomeAdmin

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FFE5B4',
  },
  headercontainer: {
    backgroundColor: '#FF961D',
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
    backgroundColor:'#F3F0D7',
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
      color: '#05375a',
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
