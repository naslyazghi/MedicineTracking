import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchEachesResultsScreen from '../screens/SearchEachesResultsScreen'
import Feather from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, Image} from 'react-native';

const SearchEachesResultsStack = createStackNavigator();

// Main Stack
const SearchEachesResultsStackScreen = ({route, navigation}) => {
  //const {token} = route.params;
  //console.log('Token in Main Stack: ' + token);

  return (
    <SearchEachesResultsStack.Navigator>
      <SearchEachesResultsStack.Screen
        name={'Search Eaches'}
        component={SearchEachesResultsScreen}
        //initialParams={{token: token}}
        options={{
          title: 'Search Eaches Results',
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
    </SearchEachesResultsStack.Navigator>
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

export default SearchEachesResultsStackScreen;
