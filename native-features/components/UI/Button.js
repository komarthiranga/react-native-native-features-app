import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Entypo } from '@expo/vector-icons'; 

const Button = ({onPress, children, icon}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
              {icon && <Entypo name={icon} size={24} color={Colors.primary100} /> }
              <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       borderWidth: 1,
       borderColor:  Colors.primary100,
       marginVertical: 10,
       padding: 8,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       gap: 10
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color:  Colors.primary100
    }
})


export default Button;