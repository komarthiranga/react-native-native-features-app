import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Alert } from 'react-native';
import {  useState, useCallback } from 'react';
import { useLayoutEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 

const Map = ({navigation, route}) => {
  const initialLocation = route.params && {
    lat: route.params.initLat,
    lng: route.params.initLng
  }  
  const [ selectedLocation, setSelectedLocation ] = useState(initialLocation);
  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitube: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  };

  const selectLocationHandler = (event) => {
     const lat = event.nativeEvent.coordinate.latitude;
     const lng = event.nativeEvent.coordinate.longitude;
     setSelectedLocation({
        lat,
        lng
     })
  }

  const savedPickedLocationHandler = useCallback(() => {
    if(!selectedLocation) {
        Alert.alert('No Location Picked', 'Kindly pick the location form the map');
        return;
    }

    navigation.navigate('AddPlace', {
       pickedLat: selectedLocation.lat,
       pickedLng: selectedLocation.lng
    })
  }, [navigation, selectedLocation])

  useLayoutEffect( () => {
      if(initialLocation) {
          return ;
      }
      navigation.setOptions({
        headerRight: ({tintColor}) =>  <MaterialIcons name="add" size={24} color={tintColor} onPress={savedPickedLocationHandler} />
      })
  }, [navigation, savedPickedLocationHandler, initialLocation])

  return <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
         { selectedLocation && <Marker title="Picked Location" coordinate={{latitude: selectedLocation.lat, longitude: selectedLocation.lng}} /> }
  </MapView>;
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default Map;
