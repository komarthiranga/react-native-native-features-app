import {  StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../constants/colors'

const SubmitButton = ({children, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
                <Text style={styles.text}> {children} </Text> 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.primary800,
        padding: 20,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary500,
        borderRadius: 35
    },

    text: {
        fontWeight: 700,
        color: 'white'
    }

})

export default SubmitButton;
