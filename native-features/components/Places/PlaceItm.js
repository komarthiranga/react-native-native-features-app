
import { SafeAreaView, Text, StyleSheet, Image } from 'react-native';
const PlaceItm = ({place}) => {
    return (
        <SafeAreaView>
            <Image source={{uri: place.imageUri}} />
            <SafeAreaView>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default PlaceItm;