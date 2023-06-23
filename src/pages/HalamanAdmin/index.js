import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Gap, Button} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//  menambahkan async / await syntax pada method fetch yang digunakan untuk mengambil data dari API

class HalamanAdmin extends Component {
          
    // constructor(props) {
    //     super(props);

    //     // cara mendapatkan data dari paramenter
    //     const { jsonData } = this.props.route.params;
    //     console.log("Test ClassScreen");
    //     //console.log(jsonData);

    //     // Menyimpan data di dalam state
    //     this.state = {
    //       jsonData: jsonData
    //     };

    //     console.log("email: "+jsonData[0].email);
    //     // Ferch promise function
    //     const fetchPromise = fetch('http://103.31.38.67/unkpresent/public/mobile/classes/'+jsonData[0].email, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //       }
    //     })
    //     .then(response => response.text())
    //     .then(textData => {
    //       //console.log(textData);
    //       // cek error
    //       if (textData.includes("ERROR")) {
    //         Alert.alert('Error Message', 'Sorry, access data class failed. Please try again.');
    //         return;
    //       } else if (textData.includes("EMPTY ROW")) {
    //         Alert.alert('Empty Record', 'Sorry, there is no class you have registered.');
    //         return;
    //       } else {
    //         const dataclasses = textData.replace("<script>console.log('Connected successfully.' );</script>", "");
    //         const jsonClasses = JSON.parse(dataclasses);
    //         this.setState({jsonClasses: jsonClasses});
    //       }
    //     })
    //     .catch(error => {
    //       Alert.alert('Error Message', 'Sorry, we have got an error. Please try again.');
    //       return;
    //     });

    //     // set time out
    //     const timeout = new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         reject(new Error('Request timed out'));
    //       }, 5000); // set timeout to 5 seconds
    //     });

    //     // set promise race time out
    //     Promise.race([fetchPromise, timeout])
    //       .catch(error => {
    //         if (error.message === 'Request timed out') {
    //           Alert.alert('Error Message', 'Sorry, the request has timed out. Please try again.');
    //         } else {
    //           Alert.alert('Error Message', 'Sorry, we have got an error. Please try again.');
    //         }
    //       });


    // }

      
    
  renderHeader() {
    
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Donasi Masuk</Text>
        {/* <TouchableOpacity style={styles.notificationIcon} onPress={()=>this.props.navigation.navigate('HomeScreen', { jsonData: this.state.jsonData })} > */}
            <Icon name="ios-home" size={24} color="white" />
        {/* </TouchableOpacity> */}
        
      </View>
    );
  }


  renderContent() {
    //console.log("Data Classes2:");
    //console.log(this.state.jsonClasses);
  
    // if (!this.state.jsonClasses) {
    //   return (
    //     <View style={styles.content}>
    //       <Text>No classes are showned.</Text>
    //     </View>
    //   );
    // }
  
    return (
      <View style={styles.content} backgroundColor='#fff'>
        <ScrollView>
          {/* {this.state.jsonClasses.map((item, index) => ( */}
          {/* <TouchableOpacity key={index} style={styles.itemContainer}> */}
            <TouchableOpacity  style={styles.itemContainer}>
              <View style={styles.itemDetails} >
                <View style={styles.headerCard} >
                  <Text style={styles.itemName}>Rm. Pisogr</Text>
                  <TouchableOpacity style={styles.IconViewClass} >
                    <MaterialIcons name="location-pin" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={{borderTopWidth: 1, width: '100%', borderColor: '#f7f0f7'}} />
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLeft}>Detail Penjemputan</Text>
                  <Text style={styles.tableCellRight}>Depan Rumah Makan</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLeft}>Jam berapa dimasak?</Text>
                  <Text style={styles.tableCellRight}>12.00 WITA</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLeft}>Perkiraan Kadarluasa (credits)</Text>
                  <Text style={styles.tableCellRight}>20.00 WITA</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLeft}>Jenis Makanan</Text>
                  <Text style={styles.tableCellRight}>nasi, ikan, sayur</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLeft}>Koordinat Latitude</Text>
                  <Text style={styles.tableCellRight}>124.9835546603421</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLeft}>Koordinat Longitude</Text>
                  <Text style={styles.tableCellRight}>1.4170496424265122</Text>
                </View>
                <View style={styles.tableRow}paddingBottom={12}>
                  <Text style={styles.tableCellLeft}>ket tambahan</Text>
                  <Text style={styles.tableCellRight}>saus sudah dicampur</Text>
                </View>
                 <Gap height={20} />
        <View style={styles.inputRow}>
          <Text style={{color:'black',}}>Target Donasi</Text>
          <MaterialCommunityIcons name="target-account" color="black" size={20} style={{textAlign:'right'}} />
          <TextInput
          placeholder="12abcxx"
            style={styles.input}
            // onChangeText={setNewPass}
            // value={newPass}
            
          />
        </View>
                 <View style={styles.headerCard}backgroundColor=''textAlign='center' paddingTop={20} >
                  <TouchableOpacity  >
                    <Text style={styles.itemName} >Confirm</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </TouchableOpacity>
          {/* ))} */}
        </ScrollView>
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
  header: {
    backgroundColor: '#F86F03',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  input: {
    fontSize:20,
    height: 30,
    margin: 0,
    borderWidth: 1,
    color:'black',
    borderColor: 'black',
    padding: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    top:-15
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    
    
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  tableCellLeft: {
    color: '#05375a',
    flex: 1,
    textAlign: 'left',
    fontSize: 12,
    marginTop: 5,
  },
  tableCellRight: {
    color: '#05375a',
    flex: 1,
    textAlign: 'right',
    fontSize: 11,
    marginTop: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    //padding: 15,
    paddingBottom: 10,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    elevation: 5,
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    borderRadius: 10,
    shadowColor: 'black',
  },
  headerCard: {
    //backgroundColor: '#7732a8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:0,
    //paddingHorizontal: 16,
    //paddingTop: 16,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  IconViewClass: {
    position: 'relative',
    position: 'absolute',
    right: 5,
    //top: 17,
    paddingBottom: 10,
},
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    color: '#05375a',
    fontSize: 16,
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
    },
});
    
    export default HalamanAdmin;