//
import React, { useEffect, useState } from 'react';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { SubHeader, Devider, Container } from '../../../components';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sliceText } from '../../../utils';
import { ImageViewer } from './components';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('screen');

const ProductDetailsScreen = ({ route }) => {
    const { getParent } = useNavigation();
    const [scrollPossition, setScrollPossition] = useState()
    const { productName, productPrice, productBrandName, productImageUrl, parentScreen } = route.params;
    // Hiding Bottom Tab Navigation
    useEffect(() => {
        getParent().setOptions({ tabBarStyle: { display: 'none' } })
        return () => {
            getParent().setOptions({
                tabBarStyle: {
                    display: 'flex',
                    borderTopColor: 'rgba(0, 0, 0, .2)',
                    paddingTop: Platform.OS === 'android' ? 15 : 10,
                    paddingBottom: Platform.OS === 'android' ? 15 : 30,
                    height: Platform.OS === 'android' ? 70 : 90,
                }
            })
        }
    }, [])
    //
    return (
        <SafeAreaView style={styles.container}>
            {scrollPossition > 0.5 ? <SubHeader title="Product Details" backTo={parentScreen} /> : <DetailsHeader backTo={parentScreen} />}
            <ScrollView onScroll={e => setScrollPossition(e.nativeEvent.contentOffset.y)} scrollEventThrottle={16} showsVerticalScrollIndicator={false} >
                <ImageViewer image={productImageUrl} />
                <Devider />
                <View style={styles.contentContainer}>
                    <Text style={styles.proName}>
                        {sliceText(productName, 67)}
                    </Text>
                    <Devider height={10} />
                    {/* Product Details */}
                    <View>
                        <Text style={styles.title}>
                            Product Details
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '300', letterSpacing: 0.5, color: COLORS.black_color }}>
                            The Honda Inner Rear View Mirror, Mirror Stay Comp Day Night Nh1L 76430Semk01Za offered by Honda is of industrial-grade quality and is
                        </Text>
                    </View>
                    <Devider height={10} />
                    {/* item information */}
                    <View >
                        <Text style={styles.title}>
                            Item Info
                        </Text>
                        <ItemContainer title="Item Type" value='Mirror' />
                        <ItemContainer title="Brand" value={productBrandName} />
                        <ItemContainer title="Category" value='Body Parts' />
                        <ItemContainer title="Available Quantities" value='300' />
                    </View>
                    <Devider />
                    {/* Controls */}
                    <View style={styles.contorllsContainer}>
                        <Text>Quantity</Text>
                        <View style={styles.quantityControls}>
                            <View style={styles.box}>
                                <AntDesign name="minus" size={25} />
                            </View>
                            <Text style={styles.counterTxt}>
                                1
                            </Text>
                            <View style={styles.box}>
                                <AntDesign name="plus" size={25} />
                            </View>
                        </View>
                        <Devider />
                        <View style={styles.paymentsControls}>
                            <View style={styles.btn}>
                                <Text style={styles.priceTxt}>
                                    Pay Now
                                </Text>
                                <FontAwesome name="money" size={20} color='#fff' style={{ marginLeft: 10 }} />
                            </View>
                            <Text style={styles.price}>
                                $ {productPrice}
                            </Text>
                            <View style={styles.btn}>
                                <Text style={styles.priceTxt}>
                                    Add Cart
                                </Text>
                                <MaterialCommunityIcons name="cart-check" size={20} color='#fff' style={{ marginLeft: 10 }} />
                            </View>
                        </View>
                    </View>
                </View>
                <Devider />
                <Devider />
                <Devider />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '3%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.bg_tertiary
    },
    iconCon: {
        width: 37,
        height: 37,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#00000097",
        // opacity: 0.8
        // backgroundColor: COLORS.black_color
    },
    contentContainer: {
        paddingHorizontal: LAY_OUT.paddingX,
    },
    proName: {
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 0.9,
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 18, fontWeight: "500",
        marginBottom: 5, letterSpacing: 1,
        color: COLORS.black_color,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '3%',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray_color,
    },
    contorllsContainer: {
        alignItems: 'center',
    },
    quantityControls: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        // backgroundColor: 'blue'
    },
    box: {
        flex: 1,
        padding: '5%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.gray_color,
        alignItems: 'center',
        justifyContent: 'center'
    },
    counterTxt: {
        flex: 2,
        fontSize: 35,
        fontWeight: '500',
        textAlign: 'center',
    },
    paymentsControls: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btn: {
        padding: '3%',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary_color,
    },
    priceTxt: {
        fontSize: 17,
        fontWeight: '500',
        color: "#ffffff"
    },
    price: {
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center'
    }
})


const DetailsHeader = ({ backTo }) => {
    const navigation = useNavigation()
    const backToPreviousScreen = () => {
        if (backTo)
            navigation.navigate('Home')
        navigation.goBack()
        backTo = null
    }

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={backToPreviousScreen} style={styles.iconCon}>
                <AntDesign name="left" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.iconCon}>
                <AntDesign name="hearto" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const ItemContainer = ({ title, value }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.itemContainer}>
            <Text style={{ fontWeight: '300', fontSize: 18 }}>
                {title}
            </Text>
            <Text style={{ fontWeight: '300', fontSize: 18 }}>
                {value}
            </Text>
        </View>
    )
}

