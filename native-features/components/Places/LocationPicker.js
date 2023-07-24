import { SafeAreaView, StyleSheet, Alert, Image, Text } from "react-native";
import Button from "../UI/Button";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useState, useEffect } from "react";
import { getMapPreview, getAddress } from "../../utils/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

const LocationPicker = ({ onPickLocation }) => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setPickedLocation({
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      });
    }
  }, [isFocused, route]);

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant location permissions to use this app"
      );
      return false;
    }
    return true;
  };

  const handleLocateUser = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const handlePickupLocation = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No Location picked yet...</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onPickLocation({ ...pickedLocation, address });
      }
    };
    handleLocation();
  }, [pickedLocation, onPickLocation]);

  return (
    <SafeAreaView>
      <SafeAreaView style={styles.mapContainer}>{locationPreview}</SafeAreaView>
      <SafeAreaView style={styles.actions}>
        <Button onPress={handleLocateUser} icon="location">
          Locate user
        </Button>
        <Button onPress={handlePickupLocation} icon="map">
          Pickup on Map
        </Button>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 20,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
