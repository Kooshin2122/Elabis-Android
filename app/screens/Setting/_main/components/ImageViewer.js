//
import React from 'react';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ImageViewer = ({ image = null }) => {
    return (
        <View style={styles.imageContainer}>
            {
                image ?
                    <Image
                        resizeMode="cover"
                        source={{ uri: image }}
                        style={{ width: '100%', height: '100%' }}
                    />
                    :
                    <FontAwesome5 name="user-alt" size={50} />
            }
        </View>
    )
}

export default ImageViewer;

const styles = StyleSheet.create({
    imageContainer: {
        width: 110,
        height: 110,
        borderRadius: 60,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    }
})
