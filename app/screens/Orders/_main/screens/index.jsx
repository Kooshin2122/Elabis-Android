//
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//
import Basket from './Basket';
import OnProcess from './OnProcess';
import Completed from './Completed';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';

//
const Tab = createMaterialTopTabNavigator();
//
function MaterialTopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        // tabBarStyle: { marginHorizontal: '3%' },
        tabBarLabelStyle: { fontSize: 15, fontWeight: '500' },
      }}
    >
      <Tab.Screen name="Basket" component={Basket} />
      <Tab.Screen name="On-Process" component={OnProcess} />
      <Tab.Screen name="Completed" component={Completed} />
    </Tab.Navigator>
  );
}

export default MaterialTopTabs;