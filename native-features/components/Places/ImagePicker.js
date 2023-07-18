import { SafeAreaView, Image, StyleSheet, Text } from 'react-native'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { Alert } from 'react-native';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import Button from '../UI/Button';
const ImagePicker = () => {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] =  useCameraPermissions();

    const verifyPermission = async() => {
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permission', 'You need to grant camera permissions to use this app');
            return false
        }
        return true;

    }

    const takeImageHandler = async() => {
       const hasPermission = await verifyPermission();
       if(!hasPermission) {
        return;
       }
       const image = await launchCameraAsync({
          allowsEditing: true,
          aspect: [16, 9],
          quality: 0.5
       });
       setPickedImage(image.uri)
       console.log(image);
    }

    let imagePriview = <Text>No Image taken yet.</Text>

    if(pickedImage) {
        imagePriview =  <Image style={styles.image} source={{uri: pickedImage}} />
    }

    return (
        <SafeAreaView>
            <SafeAreaView style={styles.imagePriview}>
                {imagePriview}
            </SafeAreaView>
            <Button  onPress={takeImageHandler} icon="camera">Take Image</Button>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    imagePriview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default ImagePicker;