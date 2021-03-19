import 'react-native-gesture-handler';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import CreateQRCodeStackScreen from '../subStacks/CreateQRCodeStackScreen'
import ScanQRCodeStackScreen from '../subStacks/ScanQRCodeStackScreen'

const Tab = createMaterialBottomTabNavigator();

export function QRTab({navigation}) {
    return (
      // Bottom Tab Navigator
      <Tab.Navigator initialRouteName="BarCodeScanner" activeColor="white" barStyle={{backgroundColor: '#0094FF', paddingVertical: 3}} shifting="true">
        {/* Scan Bar Code tab */}
        <Tab.Screen
          name="Scan QR Code"
          component={ScanQRCodeStackScreen}
          //initialParams={{token: token}}
          options={{
            tabBarLabel: 'Scan QR Code',
            tabBarIcon: ({color}) => (
              <Feather name="folder-plus" color={color} size={26}/>
            ),
          }}
        />

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

      </Tab.Navigator>
    );
  };

