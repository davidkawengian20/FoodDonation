import { StyleSheet, Text, PermissionsAndroid, View } from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import React, {useState, useEffect} from 'react';
import getDistance from 'geolib/es/getDistance';

const App = () => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  const [marker1, setMarker1] = useState({
    latitude: 1.4170496424265122,
    longitude: 124.9835546603421,
  });
  const [marker2, setMarker2] = useState({
    latitude: 1.4170439607651206,
    longitude: 124.98343815049607,
  });
  const [distance1, setDistance1] = useState(0);
  const [distance2, setDistance2] = useState(0);

  useEffect(() => {
    let watchId;
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          watchId = setInterval(() => {
            Geolocation.getCurrentPosition(
              position => {
                const newRegion = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                };
                setInitialRegion(newRegion);

                if (newRegion) {
                  const dist1 = getDistance(
                    {
                      latitude: newRegion.latitude,
                      longitude: newRegion.longitude,
                    },
                    {latitude: marker1.latitude, longitude: marker1.longitude},
                  );

                  const dist2 = getDistance(
                    {latitude: marker1.latitude, longitude: marker1.longitude},
                    {latitude: marker2.latitude, longitude: marker2.longitude},
                  );

                  // Set distances to state
                  setDistance1(dist1);
                  setDistance2(dist2);
                }
              },
              error => {
                //console.log(error.code, error.message);
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          }, 2000);
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    requestLocationPermission();
    return () => clearInterval(watchId);
  }, [marker1, marker2]);


  const onMapReady = () => {
    setMapReady(true);
    if (initialRegion) {
      mapRef.animateToRegion(initialRegion, 2000);
    }
  };

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{height: '90%'}}
        initialRegion={initialRegion}
        showsUserLocation={true}
        ref={ref => {
          setMapRef(ref);
        }}
        onMapReady={onMapReady}
        showsMyLocationButton={true}>
        <Marker
          coordinate={marker1}
          title={'Marker 1'}
          description={'This is marker 1'}
        />

        <Marker
          coordinate={marker2}
          title={'Marker 2'}
          description={'This is marker 2'}
        />
      </MapView>
      <View
        style={{height: '10%', justifyContent: 'center', alignItems: 'center', backgroundColor:'black'}}>
        <Text>
          Distance from My Location to Rm. Pisgor: {distance1 / 1000} km
        </Text>
        <Text>Distance from Rm. Pisgor to Keluarga Rostchild: {distance2 / 1000} km</Text>
      </View>
    </View>
  );
}

export default App

const styles = StyleSheet.create({})