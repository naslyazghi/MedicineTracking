import 'react-native-gesture-handler';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import NewOrderScreen from '../screens/NewOrderScreen';
import NewOrderStackScreen from '../subStacks/NewOrderStackScreen';
import DeliveredOrdersStackScreen from '../subStacks/DeliveredOrdersStackScreen';
// import {DeliveredOrdersScreen} from '../screens/DeliveredOrdersScreen';
// import {CurrentOrdersScreen} from '../screens/CurrentOrdersScreen';
import CurrentOrdersStackScreen from '../subStacks/CurrentOrdersStackScreen';

const Tab = createMaterialBottomTabNavigator();

export function OrdersTab({navigation}) {
    return (


      
      <Tab.Navigator initialRouteName="CurrentOrdersStackScreen" activeColor="white" barStyle={{backgroundColor: '#0094FF', paddingVertical: 3}} shifting="true">
        <Tab.Screen
          name="New Order"
          component={NewOrderStackScreen}
          //initialParams={{token: token}}
          options={{
            tabBarLabel: 'New Order',
            tabBarIcon: ({color}) => (
              <Feather name="folder-plus" color={color} size={26}/>
            ),
          }}
        />

        <Tab.Screen
          name="Current Orders"
          component={CurrentOrdersStackScreen}
          //initialParams={{token: token}}
          options={{
            tabBarLabel: 'Current Orders',
            tabBarIcon: ({color}) => (
              <Feather name="file-text" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Delivered Orders"
          component={DeliveredOrdersStackScreen}
          //initialParams={{token: token}}
          options={{
            tabBarLabel: 'Delivered Orders',
            tabBarIcon: ({color}) => (
              <Feather name="check-square" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

