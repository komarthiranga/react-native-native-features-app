import {
  ScrollView,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import Button from "../components/UI/Button";
import { Colors } from "../constants/colors";
import { useEffect, useState } from 'react';
import { fetchPlaceDetail } from '../utils/database'

const PlaceDeatils = ({route, navigation}) => {
  const selectedPlaceId = route.params.placeId;
  const [place, setPlace] = useState(); 
  useEffect(() => { 
    fecthPlaceDetails();
  }, [selectedPlaceId]);
  
  const fecthPlaceDetails = async() => {
    const response = await fetchPlaceDetail(selectedPlaceId);
    setPlace(response);
    navigation.setOptions({
        title: response?.title
    })
  }
  
  const showOnMapHandler = () => {
    navigation.navigate('Map', {initLat: place.lat, initLng: place.lng})
  };

  return (
    <>
    {!place && <SafeAreaView><Text>Loading...</Text></SafeAreaView>}
    {place && <ScrollView>
      <Image style={styles.image} source={{uri: place.imageUri}}/>
      <SafeAreaView style={styles.locationContainer}>
        <SafeAreaView style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </SafeAreaView>

        <Button icon="map" onPress={showOnMapHandler}>
          View on Map
        </Button>
      </SafeAreaView>
    </ScrollView> }
  </> 
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    marginBottom: 20
  },

  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  addressContainer: {
    padding: 20,
  },

  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlaceDeatils;
