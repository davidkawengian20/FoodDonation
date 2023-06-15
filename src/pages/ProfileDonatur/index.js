import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProfilePic} from '../../assets/images';
import {Gap} from '../../components';
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
      <View style={styles.contentWrapper}>
        <View style={styles.logoWrapper}>
        <Image source={ProfilePic} style={styles.profileImage} />
          <Gap height={20} />
          <Text>Hello</Text>
          <Text style={styles.titleText}>{`${nama}`}</Text>
          <Text style={styles.titleText}>{`${nomor}`}</Text>
          <Text style={styles.titleText}>{`${email}`}</Text>
          <Text style={styles.titleText}>{`${address}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileDonatur;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2CECE',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#FF961D',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 30,
    paddingTop: 26,
    marginTop: 24,
    
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginTop: 140,
  },
  logo: {
    height: '70%',
    width: '70%',
  },
  titleText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  profileImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    top:-20,
  },
});