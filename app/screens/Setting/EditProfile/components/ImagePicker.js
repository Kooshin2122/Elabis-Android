//
import React, { useState } from 'react';
import * as ImagePickers from 'expo-image-picker';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { ImageViewer } from '../../_main/components';
import { Devider } from '../../../../components';

const ImagePicker = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const pickImageAsync = async () => {
        let result = await ImagePickers.launchImageLibraryAsync({
            mediaTypes: ImagePickers.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            console.log('------', result.assets[0].uri);
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    const pickImage = () => {
        // make sure if the user is login (if is not login navigate login screen)
        // else pick image
        pickImageAsync()

    }
    return (
        <View style={styles.container}>
            <Devider />
            <TouchableOpacity onPress={pickImage} activeOpacity={0.6} >
                <ImageViewer
                    image={selectedImage}
                />
            </TouchableOpacity>
            <Devider />
            <TouchableOpacity onPress={pickImage} style={styles.changeBtn} activeOpacity={0.6} >
                <Text style={styles.changeImageTxt}>
                    Change Image
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    container: {
        paddingBottom: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.bg_primary
    },
    changeBtn: {
        paddingVertical: '3%',
        paddingHorizontal: '4%',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: COLORS.gray_color
    },
    changeImageTxt: {
        fontSize: 16,
        color: 'gray',
        fontWeight: '500',
        letterSpacing: 0.7,
    }
})
