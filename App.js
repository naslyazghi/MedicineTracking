import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStackScreen from './src/stacks/AuthenticationStackScreen';
import MainStackScreen from './src/stacks/MainStackScreen';
import SplashScreen from './src/screens/SplashScreen'


const Stack = createStackNavigator();
const isUserSignedIn = true;



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
  return (
    // Navigation container is reponsible for controlling the themes, states, restoring states
    <NavigationContainer>
      {/* Check if user is logged in */}
      {isUserSignedIn == true ? (
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
  );
}



export default App;