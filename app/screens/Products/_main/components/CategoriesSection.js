import React from 'react'
import SideBarCards from './SideBarCards';
import { Devider } from '../../../../components';
import { useSelector, useDispatch } from 'react-redux';
import CategoriesContainer from './CategoriesContainer';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { allMainCategoriesEndPoint, allSubCategoriesEndPoint } from '../services';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';


const CategoriesSection = () => {
    const { selectCategory } = useSelector(state => state.productsSlice)
    return (
        <View style={styles.container}>
            {/* side bar */}
            <View style={styles.sideBar}>
                <FlatList
                    data={allMainCategoriesEndPoint}
                    renderItem={({ item }) => <SideBarCards {...item} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {/* Main View */}
            <View style={styles.mainView}>
                <ScrollView style={styles.mainViewScrollCon} showsVerticalScrollIndicator={false}>
                    {/* select category name */}
                    <View style={LAY_OUT.flex_row}>
                        <Text style={{ color: 'gray' }}>
                            {selectCategory}
                        </Text>
                        <View style={{ borderBottomWidth: 1.2, borderColor: COLORS.gray_color, height: 5, flex: 1, marginLeft: 5 }} />
                    </View>
                    <Devider />
                    {
                        allSubCategoriesEndPoint.map((item) => <CategoriesContainer key={item.id} {...item} />)
                    }
                    <Devider />
                </ScrollView>
            </View>
        </View>
    )
}

export default CategoriesSection;

const styles = StyleSheet.create({
    container: {
        flex: 4,
        flexDirection: 'row',
    },
    sideBar: {
        flex: 0.7,
        borderRightWidth: 0.5,
        borderColor: COLORS.gray_color,
        paddingHorizontal: '1%',
    },
    mainView: {
        flex: 3,
    },
    mainViewScrollCon: {
        padding: LAY_OUT.padding
    }
})
