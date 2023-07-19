import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Alert } from 'react-native';
import {  useState, useCallback } from 'react';
import { useLayoutEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 

const Map = ({navigation}) => {
  const [ selectedLocation, setSelectedLocation ] = useState();  
  const region = {
    latitude: 37.78,
    longitube: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
      navigation.setOptions({
        headerRight: ({tintColor}) =>  <MaterialIcons name="add" size={24} color={tintColor} onPress={savedPickedLocationHandler} />
      })
  }, [navigation, savedPickedLocationHandler])

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
