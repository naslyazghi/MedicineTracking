import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BarCodeScanner from '../screens/OrderQRScanner'
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';

const ScanQRCodeStack = createStackNavigator();

// Main Stack
const ScanQRCodeStackScreen = ({route, navigation}) => {
  //const {token} = route.params;
  //console.log('Token in Main Stack: ' + token);

  return (
    <ScanQRCodeStack.Navigator>
      <ScanQRCodeStack.Screen
        name={'Scan a QR Code'}
        component={BarCodeScanner}
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
    </ScanQRCodeStack.Navigator>
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

export default ScanQRCodeStackScreen;
