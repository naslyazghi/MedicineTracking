import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import QRScreen from '../screens/CreateQRCodeScreen';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';

const CreateQRCodeStack = createStackNavigator();

// Main Stack
const CreateQRCodeStackScreen = ({route, navigation}) => {
  //const {token} = route.params;
  //console.log('Token in Main Stack: ' + token);

  return (
    <CreateQRCodeStack.Navigator>
      <CreateQRCodeStack.Screen
        name={'Create a QR Code'}
        component={QRScreen}
        //initialParams={{token: token}}
        options={{
          title: 'Create a QR Code',
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
    </CreateQRCodeStack.Navigator>
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

export default CreateQRCodeStackScreen;
