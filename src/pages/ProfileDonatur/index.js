import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProfilePic} from '../../assets/images';
import {Gap} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const ProfileDonatur = ({navigation, route}) => {
  const db = getDatabase();
  const uid = route.params.uid;
  const [nama, setNama] = useState('');
  const [nomor, setNomor] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const fetchUserDataRealtime = () => {
    const userRef = r(db, `User/${uid}`);
    const onValueChange = onValue(
      userRef,
      snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setNama(userData.Nama);
          setNomor(userData.Nomor);
          setEmail(userData.Email);
          setAddress(userData.Address);
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
  return (

    
    <View style={styles.container}>
     <Icon name="md-chevron-back-sharp" size={50} color="#fff" />
    <Text style={{textAlign:'center',fontWeight:'bold', fontSize:20, color:'#fff'}}>Profile</Text>
      <View style={styles.contentWrapper}>
      <View style={styles.iconContainer}>
                <Icon name="person-circle-outline" size={150} color="#FF961D" />
            </View>
          <View style={styles.contentcontainer}>

          <Text style={styles.ketItem}>Nama Rumah makan </Text>
          <View style={styles.menuContainer}>
          <Text style={styles.titleText}>{`${nama}`}</Text>
          </View>

          <Text style={styles.ketItem}>Alamat</Text>
          <View style={styles.menuContainer}>
          <Text style={styles.titleText}>{`${address}`}</Text>
          </View>

          <Text style={styles.ketItem}>Nomor Tlpn/WA</Text>
          <View style={styles.menuContainer}>
          <Text style={styles.titleText}>{`${nomor}`}</Text>
          </View>

          <Text style={styles.ketItem}>email</Text>
          <View style={styles.menuContainer}>
          <Text style={styles.titleText}>{`${email}`}</Text>
          </View>
          </View>
        
      </View>
    </View>
  );
};

export default ProfileDonatur;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF961D',
  },
  iconContainer: {
        marginBottom: 20,
        marginTop: 20,
        alignItems:'center'
    },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 30,
    paddingTop: 0,
    marginTop: 20,
    
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width:'100%',
    marginTop: 50,
    backgroundColor:'red'
  },
  logo: {
    height: '70%',
    width: '70%',
  },
  titleText: {
    fontWeight: 'bold',
    color: 'orange',
    fontSize: 20,
    paddingLeft:30,
    paddingVertical:5
  },
  menuContainer:{
    width: '100%',
    height: 60,
    margin:0,
    backgroundColor: 'white',
    borderRadius: 10,
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
    ketItem:{
      color:'#B7B7B7',
      paddingLeft:10 ,
      paddingTop:15
    },
});