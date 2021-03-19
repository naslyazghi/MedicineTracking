import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitMessageScreen} from '../screens/TransitMessageScreen';
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';

const TransitMessageStack = createStackNavigator();

// Main Stack
const TransitMessageStackScreen = ({route, navigation}) => {
  //const {token} = route.params;
  //console.log('Token in Main Stack: ' + token);
  const { parsed_data } = route.params;
  console.log(parsed_data.num);

return (
    <TransitMessageStack.Navigator>
    <TransitMessageStack.Screen
        name={'Transit Message'}
        component={TransitMessageScreen}
        initialParams={{order_num: parsed_data.num}}
        options={{
        title: 'Transit Message',
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
    </TransitMessageStack.Navigator>
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

export default TransitMessageStackScreen;
