import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPlace from './screens/AddPlace';
import { Ionicons } from '@expo/vector-icons'; 
import { useRef } from 'react';
import { Colors } from './constants/colors';
import Map from './screens/Map';

export default function App() {
  const Stack = createNativeStackNavigator(); 
  const navigationRef = useRef();
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
         </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
