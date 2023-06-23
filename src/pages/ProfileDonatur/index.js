import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//  menambahkan async / await syntax pada method fetch yang digunakan untuk mengambil data dari API

class ProfileDonatur extends Component {
    constructor(props) {
        super(props);

        // cara mendapatkan data dari paramenter
        const { jsonData } = this.props.route.params;

        console.log("sekarang ada di Profile Donatur");

        console.log(jsonData);

        // Menyimpan data di dalam state
        this.state = {
          jsonData: jsonData
        };
        console.log("email: "+jsonData[0].email);
    }

  renderHeader() {
    
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile Donatur</Text>
        <TouchableOpacity style={styles.notificationIcon} onPress={()=>this.props.navigation.navigate('HomeScreen', { jsonData: this.state.jsonData })} >
            <Icon name="ios-home" size={24} color="white" />
        </TouchableOpacity>
        
      </View>
    );
  }


  renderContent() {
    //console.log("Data Classes2:");
    //console.log(this.state.jsonClasses);
    
    return (
        <View style={styles.containerprofile}>
            <View style={styles.iconContainer}>
                <Icon name="person-circle-outline" size={200} color="#555" />
            </View>
            <Text style={styles.text}>Hello!!</Text>
            <View style={styles.textinputcontainer}>
            <Text style={styles.textdata}>{this.state.jsonData[0].username}</Text>
            </View>
            <Text style={styles.text}>Email</Text>
            <View style={styles.textinputcontainer}>
            <Text style={styles.textdata}>{this.state.jsonData[0].email}</Text>
            </View>
            <Text style={styles.text}>Alamat</Text>
            <View style={styles.textinputcontainer}>
            <Text style={styles.textdata}>{this.state.jsonData[0].address}</Text>
            </View>
            <Text style={styles.text}>Nomor (tlpn/WA)</Text>
            <View style={styles.textinputcontainer}>
            <Text style={styles.textdata}>{this.state.jsonData[0].nomor}</Text>
            </View>
        </View>
    );
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>2023 © Unklab</Text>
      </View>
    );
  }

  render() {
    
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textinputcontainer:{
    
  },
  header: {
    backgroundColor: '#85A389',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  footer: {
    height:25,
    alignItems: 'center',
    justifyContent: 'flex-start', // on top
    //backgroundColor: '#2c3e50',
    //justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },

  footerText: {
      fontSize: 16,
      //color: '#fff',
      color: 'gray',
  },
  notificationIcon: {
        position: 'relative',
        position: 'absolute',
        right: 20,
        top: 17,

    },containerprofile: {
        flex: 1,
        
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginTop:30,
        backgroundColor:'#fff',
        
        
    },
      iconContainer: {
        marginBottom: 20,
        marginTop: 20,
        backgroundColor:'#fff',
        alignItems:'center'
    },
      text: {
        fontSize: 18,
        color: '#05375a',
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft:20
      },
      textdata: {
        fontSize: 16,
        color: '#05375a',
        //fontWeight: 'bold',
        marginBottom: 20,
        marginLeft:30,
        fontSize:20
      },
      
}); 
    
    export default ProfileDonatur;