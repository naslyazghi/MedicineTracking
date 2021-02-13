import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InventoryItemsScreen from '../screens/InventoryItemsScreen';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';

const InventoryItemsStack = createStackNavigator();

// Main Stack
const InventoryItemsStackScreen = ({route, navigation}) => {
//const {token} = route.params;
//console.log('Token in Main Stack: ' + token);

    return (
        <InventoryItemsStack.Navigator>
            <InventoryItemsStack.Screen
                name={'Inventory Items'}
                component={InventoryItemsScreen}
                //initialParams={{token: token}}
                options={{
                title: 'Inventory Items',
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
                        name="plus"
                        size={26}
                        //onPress={() => navigation.navigate('AddGroup', {token: token})}
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
        </InventoryItemsStack.Navigator>
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

export default InventoryItemsStackScreen;
