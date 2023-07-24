import { FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
import PlaceItem from './PlaceItm';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
const PlaceList = ({places = []}) => {
    const navigation = useNavigation();
    const selectPlaceHandler = (id) => {
        navigation.navigate('PlaceDetails', {placeId: id})
    }

    if(places.length === 0) {
        return (
            <SafeAreaView style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No Placess available - Start to add!</Text>
            </SafeAreaView>
        )
    }
    return (
        <FlatList style={styles.list} data={places} keyExtractor={ (item)  => item.id } renderItem={ ({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler} /> } />
    )
}

const styles = StyleSheet.create({
    list: {
        margin: 8
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})

export default PlaceList;