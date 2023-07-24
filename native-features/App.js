import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPlace from './screens/AddPlace';
import { Ionicons } from '@expo/vector-icons'; 
import { useEffect, useRef, useState } from 'react';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { init } from './utils/database';
import AppLoading from 'expo-app-loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlaceDeatils from './screens/PlaceDetails';

export default function App() {
  const Stack = createNativeStackNavigator(); 
  const navigationRef = useRef();
  const[dbInitialized, setDbInitialized] = useState(false);
  useEffect( () => {
    initDb();
  }, [])

  const initDb = async() => {
    try {
    const _init = await init();
    setDbInitialized(true);
    } catch(error) {
      console.log(error);
    }
  }

  if(!dbInitialized) {
    return <SafeAreaView style={styles.text}><Text>Loading....</Text></SafeAreaView>
  }

  const handleAddplaceNavigation = () => {
    navigationRef.current?.navigate('AddPlace');
  }
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer ref={navigationRef}>
         <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
            headerRight: ({color, size}) => <Ionicons name="ios-add-circle-outline" size={24} color={color} onPress={handleAddplaceNavigation} />
         }}>
            <Stack.Screen name="AllPlaces" component={AllPlaces} options={{title: 'Your favorite places'}} />
            <Stack.Screen name="AddPlace" component={AddPlace} options={{title: 'Add a new Place'}} />
            <Stack.Screen name="Map" component={Map} options={{title: 'Map'}} />
            <Stack.Screen name="PlaceDetails" component={PlaceDeatils} options={{title: 'Loading Place...'}}/>
         </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
