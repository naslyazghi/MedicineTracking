import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from '../components/DrawerContent';
import {OrdersTab} from '../tabNavigators/OrdersTab'
import {SettingsScreen} from '../screens/SettingsScreen';
import {AboutScreen} from '../screens/AboutScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();

const MainStackScreen = ({navigation}) => (
    <Drawer.Navigator drawerStyle={{backgroundColor: '#F7F7F7', width: 240}} drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="OrdersTab" component={OrdersTab} options={{title:'Medicine Tracking'}}/>
        <Drawer.Screen name="Settings" component={SettingsScreen}/>
        <Drawer.Screen name="About" component={AboutScreen}/>
    </Drawer.Navigator>
);

export default MainStackScreen;