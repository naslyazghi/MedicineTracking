import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewInventoryScreen from '../screens/NewInventoryScreen';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';

const NewInventoryStack = createStackNavigator();

// Main Stack
const NewInventoryStackScreen = ({route, navigation}) => {
//const {token} = route.params;
//console.log('Token in Main Stack: ' + token);

    return (
        <NewInventoryStack.Navigator>
            <NewInventoryStack.Screen
                name={'New Inventory'}
                component={NewInventoryScreen}
                //initialParams={{token: token}}
                options={{
                title: 'New Inventory',
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
        </NewInventoryStack.Navigator>
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

export default NewInventoryStackScreen;
