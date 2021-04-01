import 'react-native-gesture-handler';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import CreateQRCodeStackScreen from '../subStacks/CreateQRCodeStackScreen'
import ScanQRCodeStackScreen from '../subStacks/ScanQRCodeStackScreen'
import ProductScanQRCodeStackScreen from '../subStacks/ProductScanQRStackScreen'

const Tab = createMaterialBottomTabNavigator();

export function QRTab({navigation}) {
    return (
      // Bottom Tab Navigator
      <Tab.Navigator initialRouteName="BarCodeScanner" activeColor="white" barStyle={{backgroundColor: '#0094FF', paddingVertical: 3}} shifting="true">

        {/* Create QR Code tab */}
        <Tab.Screen
          name="Create QR Code"
          component={CreateQRCodeStackScreen}
          //initialParams={{token: token}}
          options={{
            tabBarLabel: 'Create QR Code',
            tabBarIcon: ({color}) => (
              <Feather name="file-text" color={color} size={26} />
            ),
          }}
        />

        {/* Scan Bar Code tab */}
        <Tab.Screen
          name="Scan QR Code for Updating Order in Transit"
          component={ScanQRCodeStackScreen}
          //initialParams={{token: token}}
          options={{
            tabBarLabel: 'Order in Transit',
            tabBarIcon: ({color}) => (
              <Feather name="map-pin" color={color} size={26}/>
            ),
          }}
        />
          {/* Scan Bar Code tab (For product) */}
          {/* <Tab.Screen
          name="Inventory Management"
          component={ProductScanQRCodeStackScreen}
          //initialParams={{token: token}}
          options={{
            tabBarLabel: 'Inventory Management',
            tabBarIcon: ({color}) => (
              <Feather name="shopping-cart" color={color} size={26}/>
            ),
          }}
        /> */}
          


      </Tab.Navigator>
    );
  };

