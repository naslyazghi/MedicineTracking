import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStackScreen from './src/stacks/AuthenticationStackScreen';
import MainStackScreen from './src/stacks/MainStackScreen';
import SplashScreen from './src/screens/SplashScreen'
import {ActivityIndicator} from 'react-native-paper';
import {AuthContext} from './src/contexts/AuthContext';
import {Linking, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme,} from 'react-native-paper';
import {LogIn, Navigation} from 'react-feather';


const jwt_decode = require('jwt-decode');
const Stack = createStackNavigator();
const isUserSignedIn = true;


let urlToBeOpened;
let globalUserToken;

const useMount = func => useEffect(() => func(), []);

// const HomeScreen = ({navigation}) => {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button title="Go to details screen" onPress={() => navigation.navigate("Details")}/>
//     </View>
//   );
// };


// const DetailsScreen = () => {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }



function App() {

  useMount(() => {
    Linking.getInitialURL().then(m => {
        urlToBeOpened = m;
    });
    Linking.addEventListener("url", (m) => {
      if (globalUserToken == null)
          return;
      handleInvite(m.url, globalUserToken);
    });
  });


  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };


  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        globalUserToken = action.token;
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };


  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      // Sign In
      logIn: async user => {
        const userToken = String(user.userToken);
        const userName = user.username;

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      // Sign Out
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
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
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      globalUserToken = userToken;
      if (urlToBeOpened != null && userToken != null) {
          const url = urlToBeOpened;
          urlToBeOpened = null;
          handleInvite(url, userToken);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);


  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  global.userTokenConst = loginState.userToken;




  return (
    // Navigation container is reponsible for controlling the themes, states, restoring states
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/* Check if user is logged in */}
        {loginState.userToken !== null ? (
          // <Stack.Navigator>
          //   <Stack.Screen name="Home" component={HomeScreen} 
          //     options={{
          //       title:'Medicine Tracking'
          //     }}
          //   />
          //   <Stack.Screen name="Details" component={DetailsScreen} />
          // </Stack.Navigator>
          <MainStackScreen/>
        ) : (
          <AuthenticationStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}



export default App;