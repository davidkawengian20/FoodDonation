import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, BackHandler, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const HomeDonatur = ({navigation, route}) => {
  const db = getDatabase();
  const uid = route.params.uid;
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
  useEffect(() => {
    if (uid) {
      fetchUserDataRealtime();
    }
  }, [uid]);

  const list = () => {
    navigation.navigate ('HomeAdmin')
  }
  const akun = () => {
    navigation.navigate('ProfileDonatur')
        {navigation.navigate('ProfileDonatur', {uid: uid})
        }
        
  }
  const home = () => {
    navigation.navigate ('HalamanDonatur')
  }
  
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headercontainer}>
      <Text style={{}}>Slamat Datang</Text>
      <Text style={styles.headerText}>{`${nama}`}</Text>
      </View>
      
      <Text style={{textAlign:'center',color:'black',color:'#000', fontSize:25,  alignSelf:'center', paddingBottom:0, paddingTop:10}}>Want to Share Food?</Text>
    
        <Text style={{textAlign:'center', paddingBottom:30, color:'#B7B7B7', paddingHorizontal:50}}>
          Mari berdonasi untuk membantu orang yang membutuhkan makanan diKelurahan Airmadidi Atas 
        </Text>
      <View style={styles.content}>
      <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={home} >
          <Icon name="fast-food" size={40} color="#FF961D"/>
          <Text style={styles.menuItemText}>Donation</Text>
        </TouchableOpacity>
        <Text style={styles.menuItemKet}>menu untuk melakukan donasi</Text>
        </View>

        <View style={styles.menuContainer}>
        <TouchableOpacity title style={styles.menuItem} onPress={akun} >
          <MaterialCommunityIcons name="account-circle" size={40} color="#FC6E51" />
          <Text style={styles.menuItemText}>Profile</Text>
        </TouchableOpacity>
        <Text style={styles.menuItemKet}>menu untuk melihat profil pribadi</Text>
          </View>
          
        <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={list} >
          <MaterialCommunityIcons name="onepassword" size={40} color="#FC6E51" />
          <Text style={styles.menuItemText}>Change Password</Text>
        </TouchableOpacity>
        <Text style={styles.menuItemKet}>menu untuk anda mengubah password</Text>
          </View>
          

        <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={list} >
          <MaterialCommunityIcons name="location-exit" size={40} color="#FC6E51" />
          <Text style={styles.menuItemText}>Exit</Text>
        </TouchableOpacity>
        <Text style={styles.menuItemKet}>menu untuk keluar halaman dan kembali ke login</Text>
        </View>       
        </View>
        
      </View>
  )
}

export default HomeDonatur

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color:'#B7B7B7',
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
