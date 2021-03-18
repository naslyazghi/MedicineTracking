import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CurrentOrdersScreen} from '../screens/CurrentOrdersScreen';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';

const CurrentOrdersStack = createStackNavigator();

// Main Stack
const CurrentOrdersStackScreen = ({route, navigation}) => {
  //const {token} = route.params;
  //console.log('Token in Main Stack: ' + token);

return (
    <CurrentOrdersStack.Navigator>
    <CurrentOrdersStack.Screen
        name={'Current Orders'}
        component={CurrentOrdersScreen}
        //initialParams={{token: token}}
        options={{
        title: 'Current Orders',
        headerLeft: () => (
            <Feather
            style={styles.headerLeft}
            name="menu"
            size={26}
            onPress={() => navigation.openDrawer()}
            />
        ),
        headerRight: () => (
            <Feather
            style={styles.headerRight}
            name="map-pin"
            size={26}
            onPress={() => navigation.navigate("Barcode Scanner")}
            />
        ),
        headerStyle: {
            backgroundColor: '#0094FF',
        },
        headerTitleStyle: {
            alignSelf: 'center',
            justifyContent: 'center',
        },
        headerTintColor: '#ffff',
        }}
    />
    </CurrentOrdersStack.Navigator>
);
};

const styles = StyleSheet.create({
headerLeft: {
    marginLeft: 10,
    color: 'white',
},
headerRight: {
    marginRight: 10,
    color: 'white',
},
});

export default CurrentOrdersStackScreen;
