//
import React, { useEffect, useState } from 'react';
import { BasketCards, OnProcessCard, ProductStatusCard } from '../components';
import { fetchGetAuthData } from '../../../../API';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CustomButton, Devider, ListEmptyComponent, LoadingModal } from '../../../../components';
import { readData } from '../../../../utils/localStorage/AsyncStorage';

const OnProcess = () => {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);
    const [odersData, setOdersData] = useState([]);
    const [isUserLoging, setIsUserLoging] = useState(true);
    //
    const getOrdersDataAsync = async () => {
        try {
            setLoading(true);
            const response = await fetchGetAuthData("buyer/cart/order/view");
            const filteredData = response?.data.filter((item) => item.status < 5) ?? [];
            console.log("filteredData------->", filteredData);
            setLoading(false);
            setOdersData(filteredData);
            setIsUserLoging(true);
        } catch (error) {
            setLoading(false);
            if (error == "TypeError: Cannot read property 'token_type' of null") {
                setOdersData([]);
                setIsUserLoging(false);
            }
            console.log(`error happened in the On-Process Screen ---> ${error}`);
        }
    }
    //
    useEffect(() => {
        getOrdersDataAsync();
    }, []);
    //
    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl onRefresh={getOrdersDataAsync} />}
        >
            {loading && <LoadingModal />}
            <Devider />
            <View style={styles.orderViewCon}>
                {
                    isUserLoging ?
                        <FlatList
                            data={odersData}
                            scrollEnabled={false}
                            renderItem={({ item }) => <OnProcessCard {...item} />}
                            ListEmptyComponent={() => <ListEmptyComponent title="You did not order yet" message="Looks like you have not ordered anything. Go back to the products screen and add order some products. or pull-up to reload data" />}
                        />
                        :
                        <ListEmptyComponent
                            title="Sign In Please"
                            exclamationIcon={true}
                            message="Looks like you have not Signg-In yet. Click this below button to sign-in or sign-up"
                        >
                            <CustomButton
                                title="Sign-In"
                                clickHandler={() => navigate("AuthStack")}
                            />
                        </ListEmptyComponent>
                }
                {
                    odersData.length > 0 &&
                    <CustomButton
                        title="Track Order"
                        clickHandler={() => navigate('Map')}
                    />
                }
            </View>
        </ScrollView>
    )
}

export default OnProcess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.bg_primary
    },
    orderViewCon: {
        padding: "4%",
        borderRadius: 7,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color
    }
})
