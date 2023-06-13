import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { donatelogo, Akun, home1, bgdonatur, home1r } from '../../assets'


const HomeDonatur = ({navigation, route}) => {
  {//const uid = route.params.uid;
  }
  const list = () => {
    navigation.navigate ('HomeAdmin')
  }
  const akun = () => {
    navigation.navigate('ProfileDonatur')
        {//navigation.navigate('ProfileDonatur', {uid: uid})
        }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.test1}>Want to Share Food?</Text>
      <Text style={styles.fd}>Food Donation</Text>
      <Text style={styles.donattxt}>Donasi</Text>
      <Text style={styles.donatket}>Donasi</Text>
      <Text style={styles.akuntxt}>Akun</Text>
      <Text style={styles.akunket}>Donasi</Text>

      <TouchableOpacity onPress={list}>
      <Image source={donatelogo} style={styles.list} />
      </TouchableOpacity>

      <TouchableOpacity onPress={akun}>
      <Image source={Akun} style={styles.akun}/>
      </TouchableOpacity>

      <Image source={bgdonatur} style={styles.bgDonatur}/>
      
      <Image source={home1} style={styles.Home}/>
       
      
      <View style={styles.bgtambahan}/>
      <Text style={styles.texttmbh}>Seseorang butuhkan makanan</Text>
    </View>
  )
}

export default HomeDonatur

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  list: {
    width: 107.48,
    height: 100,
    position: 'absolute',
    top: 318,
    left: 70,
  },
    akun: {
    width: 125,
    height: 118,
    position: 'absolute',
    top: 311,
    left: 200,
  },
  test1:{
    color:'#000',
    fontSize:25,
    position:'absolute',
    top:200,
    alignSelf:'center',
    fontFamily:'arial'
  },
  fd:{
    fontFamily:'arial',
    height:97,
    height:21,
    color:'#F79327',
    position:'absolute',
    alignSelf:'center',
    top:130
  },
  Home: {
    width:153,
    height:131,
    position:'absolute',
    top:10,
    alignSelf:'center'
  },
  bgDonatur: {
    position:'absolute',
    flex:1,
    alignSelf:'center',
    top:545,
    width:395,
    height:235
  },
  bgtambahan: {
    position:'absolute',
    backgroundColor:'#FF961D',
    top:780,
    width:395,
    height:40
  },
  texttmbh:{
    color:'#fff',
    position:'absolute',
    alignSelf:'center',
    top:785,
  },
  donattxt:{
    position:'absolute',
    color:'black',
    fontSize:20,
    top: 500,
    left: 95,
  }
})