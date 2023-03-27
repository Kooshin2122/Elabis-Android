//
import React, { useEffect, useState } from 'react';
import { SubHeader } from '../../../../components';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

const ImageViewer = ({ image }) => {
    const [selectImage, setSelectImage] = useState(image)
    useEffect(() => {
        setSelectImage(image)
    }, [image])
    const images = [
        { id: 1, imageUrl: image },
        { id: 2, imageUrl: require('../../../../../assets/images/ProductsImages/img1-1.png') },
        { id: 3, imageUrl: require('../../../../../assets/images/ProductsImages/img1-2.png'), },
        { id: 4, imageUrl: require('../../../../../assets/images/ProductsImages/img1-3.png'), },
    ]
    return (
        <View style={styles.container}>
            {/* main image */}
            <View style={styles.mainImage}>
                <Image
                    source={selectImage}
                    resizeMode="cover"
                    style={styles.imageStyle}
                />
            </View>
            {/* small images */}
            <View style={styles.subImages} >
                <FlatList
                    horizontal
                    data={images}
                    renderItem={({ item }) => <SubImageViewer key={item.id} {...item} changeMainImage={setSelectImage} style={{ borderColor: selectImage == item.imageUrl ? COLORS.primary_color : COLORS.gray_color }} />}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default ImageViewer;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: height / 2.4,
        backgroundColor: COLORS.bg_tertiary,
    },
    mainImage: {
        flex: 1,
        alignItems: 'center',
    },
    imageStyle: {
        width: '90%',
        height: '97%',
        // backgroundColor: 'red'
    },
    subImages: {
        flex: 0.28,
        paddingHorizontal: '1%',
        // backgroundColor: 'blue'  
    },
    subImage: {
        height: 70,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        width: width / 4.5,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    }
})

const SubImageViewer = ({ id, imageUrl, style = {}, changeMainImage = () => { } }) => {
    const onSelectSubImage = () => {
        changeMainImage(imageUrl)
    }
    return (
        <Pressable onPress={onSelectSubImage} style={[styles.subImage, { ...style }]}>
            <Image
                source={imageUrl}
                resizeMode="contain"
                style={{ width: '80%', height: '80%' }}
            />
        </Pressable>
    )
}


