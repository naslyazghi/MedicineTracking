import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewOrderScreen from '../screens/NewOrderScreen';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';

const NewOrderStack = createStackNavigator();

// Main Stack
const NewOrderStackScreen = ({route, navigation}) => {
  //const {token} = route.params;
  //console.log('Token in Main Stack: ' + token);

  return (
    <NewOrderStack.Navigator>
      <NewOrderStack.Screen
        name={'New Order'}
        component={NewOrderScreen}
        //initialParams={{token: token}}
        options={{
          title: 'New Order',
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
    </NewOrderStack.Navigator>
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

export default NewOrderStackScreen;
