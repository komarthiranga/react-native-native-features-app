import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPlace from './screens/AddPlace';
import { Ionicons } from '@expo/vector-icons'; 
import { useRef } from 'react';

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
            headerRight: ({color, size}) => <Ionicons name="ios-add-circle-outline" size={24} color={color} onPress={handleAddplaceNavigation} />
         }}>
            <Stack.Screen name="AllPlaces" component={AllPlaces} />
            <Stack.Screen name="AddPlace" component={AddPlace} />
         </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
