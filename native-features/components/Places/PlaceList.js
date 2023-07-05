import { FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
import PlaceItem from './PlaceItm';
const PlaceList = ({places = []}) => {
    if(places.length === 0) {
        return (
            <SafeAreaView style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No Placess available - Start to add!</Text>
            </SafeAreaView>
        )
    }
    return (
        <FlatList data={places} keyExtractor={ (item)  => item.id } renderItem={ ({item}) => <PlaceItem place={item} /> } />
    )
}

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16
    }
})

export default PlaceList;