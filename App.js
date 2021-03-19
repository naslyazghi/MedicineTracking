import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStackScreen from './src/stacks/AuthenticationStackScreen';
import MainStackScreen from './src/stacks/MainStackScreen';
import {ActivityIndicator} from 'react-native-paper';
import {AuthContext} from './src/contexts/AuthContext';
import {Linking, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme,} from 'react-native-paper';
import {LogIn, Navigation} from 'react-feather';


global.userTokenConst = null;
const jwt_decode = require('jwt-decode');


   //_____________________________________\\  
  //                                       \\
 //         A P P   F U N C T I O N         \\
//___________________________________________\\




function App() {

  // --------------------------
  // 1 - LOGIN HANDLING
  // --------------------------

  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  // Login reducer function
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        // globalUserToken = action.token;
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
        };
      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          userToken: null,
        };
      case 'REGISTER':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
        };
    }
  };


  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      // Log In
      logIn: async user => {
        const userToken = String(user.userToken);
        // Store the token in the local storage
        try 
        {
          await AsyncStorage.setItem('userToken', userToken);
          // Action
          dispatch({type: 'LOGIN', token: userToken});
        } 
        catch (e) 
        {
          console.log(e);
        }
      },

      // Sign Out
      signOut: async () => {
        // Delete the token from the local storage
        try 
        {
          await AsyncStorage.removeItem('userToken');
          // Action
          dispatch({type: 'LOGOUT'});
        } 
        catch (e) {
          console.log(e);
        }
      },
      
      // Sign Up
      signUp: () => {},
      // Toggle Theme
      // toggleTheme: () => {
      //   setIsDarkTheme( isDarkTheme => !isDarkTheme );
      // }
    }),
    [],
  );


  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken = null;
      try 
      {
        userToken = await AsyncStorage.getItem('userToken');
        // globalUserToken = userToken;
        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
      } 
      catch (e) 
      {
        console.log(e);
      }
    }, 1000);
  });




  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Set the userToken global variable to be used in all screens
  global.userTokenConst = loginState.userToken;



/*
  return (
    // Navigation container is responsible for controlling the themes, states, restoring states
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/*Check if user is logged in *//*}
        
        {loginState.userToken !== null ? (
          <MainStackScreen/>
        ) : (
          <AuthenticationStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
*/

   return (
     <AuthContext.Provider value={authContext}>
     <NavigationContainer>
         <MainStackScreen/>
     </NavigationContainer>
   </AuthContext.Provider>
   );
}

export default App;