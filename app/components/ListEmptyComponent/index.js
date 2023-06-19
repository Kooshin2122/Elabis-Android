//
import React from 'react';
import Devider from '../Devider';
import { COLORS } from '../../Theme/GLOBAL_STYLES';
import img from '../../../assets/images/notFound.png';
import { Image, StyleSheet, Text, View } from 'react-native';
//
const ListEmptyComponent = ({ title = "Opps!", message = 'message', children }) => {
    return (
        <View style={styles.container}>
            {/* Image Container */}
            <View style={styles.imageCon}>
                <Image
                    source={img}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <Devider />
            <Text style={styles.titleTxt}>
                {title}
            </Text>
            <Devider height={10} />
            <Text style={styles.messageTxt}>
                {message}
            </Text>
            <Devider height={30} />
            {
                children
            }
        </View>
    )
}
//
export default ListEmptyComponent;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        marginLeft: "5%",
        alignItems: 'center'
    },
    imageCon: {
        height: 200,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.3,
        textAlign: "center",
        color: COLORS.primary_color
    },
    messageTxt: {
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0.5,
        textAlign: "center",
        color: "gray"
    },
    button: {
        width: '80%',
    }
})
//