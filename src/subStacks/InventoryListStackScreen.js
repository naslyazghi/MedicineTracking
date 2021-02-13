import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InventoryListScreen from '../screens/InventoryListScreen';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';

const InventoryListStack = createStackNavigator();

// Main Stack
const InventoryListStackScreen = ({route, navigation}) => {
//const {token} = route.params;
//console.log('Token in Main Stack: ' + token);

    return (
        <InventoryListStack.Navigator>
            <InventoryListStack.Screen
                name={'Inventory List'}
                component={InventoryListScreen}
                //initialParams={{token: token}}
                options={{
                title: 'Inventory List',
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
        </InventoryListStack.Navigator>
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

export default InventoryListStackScreen;
