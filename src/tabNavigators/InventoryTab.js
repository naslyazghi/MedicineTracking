import 'react-native-gesture-handler';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import NewInventoryStackScreen from '../subStacks/NewInventoryStackScreen';
import InventoryListStackScreen from '../subStacks/InventoryListStackScreen';
import InventoryItemsStackScreen from '../subStacks/InventoryItemsStackScreen';
// import NewOrderScreen from '../screens/NewOrderScreen';
// import {DeliveredOrdersScreen} from '../screens/DeliveredOrdersScreen';
// import {CurrentOrdersScreen} from '../screens/CurrentOrdersScreen';

const Tab = createMaterialBottomTabNavigator();

export function InventoryTab({navigation}) {
    return (
        // Bottom Tab Navigator
        <Tab.Navigator initialRouteName="InventoryListStackScreen" activeColor="white" barStyle={{backgroundColor: '#0094FF', paddingVertical: 3}} shifting="true">
            {/* New order tab */}
            <Tab.Screen
                name="New Inventory"
                component={NewInventoryStackScreen}
                //initialParams={{token: token}}
                options={{
                    tabBarLabel: 'New Inventory',
                    tabBarIcon: ({color}) => (
                        // <FontAwesome name={'user-o'} style={styles.textBoxIcon}/>
                        <Feather name="folder-plus" color={color} size={26}/>
                    ),
                }}
            />

            {/* Current trders tab */}
            <Tab.Screen
                name="Inventory List"
                component={InventoryListStackScreen}
                //initialParams={{token: token}}
                options={{
                    tabBarLabel: 'Inventory List',
                    tabBarIcon: ({color}) => (
                    <Feather name="file-text" color={color} size={26} />
                    ),
                }}
            />

            {/* Delivered orders tab */}
            <Tab.Screen
                name="Inventory Items"
                component={InventoryItemsStackScreen}
                //initialParams={{token: token}}
                options={{
                    tabBarLabel: 'Inventory Items',
                    tabBarIcon: ({color}) => (
                    <Feather name="check-square" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

