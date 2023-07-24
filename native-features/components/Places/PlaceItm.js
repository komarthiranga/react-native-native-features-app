
import { SafeAreaView, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
const PlaceItm = ({place, onSelect}) => {
    const placeSelectHandler = () => {
        onSelect(place.id)
    }   
    return (
        <Pressable style={ ({pressed}) => [styles.item, pressed && styles.pressed]} onPress={placeSelectHandler}>
            <Image source={{uri: place.imageUri}} style={styles.image} alt="" />
            <SafeAreaView style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </SafeAreaView>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 2
    },

    pressed: {
        opacity: 0.1
    },

    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        width: 200,
        height: 100,
        // resizeMode: 'contain', 
    },

    info: {
        flex: 2,
        padding: 12
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.gray700
    },

    address: {
        fontSize: 12,
        color: Colors.gray700
    }

});

export default PlaceItm;