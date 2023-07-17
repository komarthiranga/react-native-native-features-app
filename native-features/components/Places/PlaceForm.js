import { SafeAreaView, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Colors } from '../../constants/colors';
import { useState } from 'react';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

const PlaceForm = () => {

    const [enteredTitle, setEnteredTitle] = useState('');

    const handleEnteredTitleChange = (enteredText) => {
        setEnteredTitle(enteredText)
    }

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                 <Text style={styles.textColor}>Title</Text>
                 <TextInput value={enteredTitle} onChangeText={handleEnteredTitleChange} style={styles.textInputContainer} />
                 <ImagePicker />
                 <LocationPicker />
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    textColor: {
        color: Colors.primary200,
        fontSize: 16
    },
    textInputContainer: {
        marginVertical: 15,
        borderWidth: 1,
        borderColor: Colors.primary200,
        padding: 15,
        color: Colors.primary200
    }
})

export default PlaceForm;