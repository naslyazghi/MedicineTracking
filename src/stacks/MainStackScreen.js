import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {DrawerContent} from '../components/DrawerContent';
import {OrdersTab} from '../tabNavigators/OrdersTab';
import {InventoryTab} from '../tabNavigators/InventoryTab';
import {InvitationCodeScreen} from '../screens/InvitationCodeScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {AboutScreen} from '../screens/AboutScreen';
import {CurrentOrderDetailsScreen} from '../screens/CurrentOrderDetailsScreen'
import CurrentOrderDetailsEditableScreen from '../screens/CurrentOrderDetailsEditableScreen'
import BarCodeScanner from '../screens/OrderQRScanner'
import {QRTab} from '../tabNavigators/QRCodeTab'
import TransitMessageStackScreen from '../subStacks/TransitMessageStackScreen'

const Drawer = createDrawerNavigator();

const MainStackScreen = ({navigation}) => (
    <Drawer.Navigator drawerStyle={{backgroundColor: '#F7F7F7', width: 240}} drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="OrdersTab" component={OrdersTab} options={{title:'Medicine Tracking'}}/>
        <Drawer.Screen name="InventoryTab" component={InventoryTab}/>
        <Drawer.Screen name="InvitationCode" component={InvitationCodeScreen}/>
        <Drawer.Screen name="Settings" component={SettingsScreen}/>
        <Drawer.Screen name="About" component={AboutScreen}/>
        <Drawer.Screen name="CurrentOrderDetails" component={CurrentOrderDetailsScreen}/>
        <Drawer.Screen name="CurrentOrderDetailsEditable" component={CurrentOrderDetailsEditableScreen}/>
        <Drawer.Screen name="Barcode Scanner" component={BarCodeScanner}/>
        <Drawer.Screen name="QRTab" component={QRTab}/>        
        <Drawer.Screen name="TransitMessage" component={TransitMessageStackScreen}/>  
    </Drawer.Navigator>
    
);

export default MainStackScreen;