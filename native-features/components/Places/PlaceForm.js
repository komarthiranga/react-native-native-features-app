import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors'

const PlaceForm = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textColor}> Form ... </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textColor: {
        color: Colors.primary200
    }
})

export default PlaceForm;