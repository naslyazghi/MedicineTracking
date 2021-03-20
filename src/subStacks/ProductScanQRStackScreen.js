import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductQRScanner from '../screens/ProductQRScanner'
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';

const ProductQRStack = createStackNavigator();

// Main Stack
const ProductQRStackScreen = ({route, navigation}) => {
  //const {token} = route.params;
  //console.log('Token in Main Stack: ' + token);

  return (
    <ProductQRStack.Navigator>
      <ProductQRStack.Screen
        name={'Scan a QR Code'}
        component={ProductQRScanner}
        //initialParams={{token: token}}
        options={{
          title: 'Scan a QR Code',
          headerLeft: () => (
            <Feather
              style={styles.headerLeft}
              name="menu"
              size={26}
              onPress={() => navigation.openDrawer()}
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
    </ProductQRStack.Navigator>
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

export default ProductQRStackScreen;
