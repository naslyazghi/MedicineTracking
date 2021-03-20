import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DeliveredOrdersScreen} from '../screens/DeliveredOrdersScreen';
import BarCodeScanner from '../screens/OrderQRScanner'
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';

const DeliveredOrdersStack = createStackNavigator();

// Main Stack
const DeliveredOrdersStackScreen = ({route, navigation}) => {
  //const {token} = route.params;
  //console.log('Token in Main Stack: ' + token);

  return (
    <DeliveredOrdersStack.Navigator>
      <DeliveredOrdersStack.Screen
        name={'Delivered Orders'}
        component={DeliveredOrdersScreen}
        //initialParams={{token: token}}
        options={{
          title: 'Delivered Orders',
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
              //onPress={() => navigation.navigate("Barcode Scanner")}
              onPress={() => navigation.navigate("OrderScanner")}
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
    </DeliveredOrdersStack.Navigator>
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

export default DeliveredOrdersStackScreen;
