import { SafeAreaView, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Colors } from '../../constants/colors';
import { useState, useCallback } from 'react';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import SubmitButton from '../UI/SubmitButton';
import { Place } from '../../modals/Place';

const PlaceForm = ({onAddPlace}) => {

    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();


    const handleEnteredTitleChange = (enteredText) => {
        setEnteredTitle(enteredText)
    }

    const handleSubmitAction = () => {
        const place = new Place(enteredTitle, selectedImage, pickedLocation);
        onAddPlace(place);
    }

    const takeImageHandler = (imageUri) => {
        setSelectedImage(imageUri)
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, [])

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                 <Text style={styles.textColor}>Title</Text>
                 <TextInput value={enteredTitle} onChangeText={handleEnteredTitleChange} style={styles.textInputContainer} />
                 <ImagePicker onTakeImage={takeImageHandler} />
                 <LocationPicker onPickLocation={pickLocationHandler} />
                 <SubmitButton onPress={handleSubmitAction}> Add Place </SubmitButton>
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