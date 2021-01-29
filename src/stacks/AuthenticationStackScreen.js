import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AuthenticationStack = createStackNavigator();

const AuthenticationStackScreen = ({navigation}) => (
    <AuthenticationStack.Navigator headerMode='none'>
        <AuthenticationStack.Screen name="SplashScreen" component={SplashScreen}/>
        <AuthenticationStack.Screen name="LoginScreen" component={LoginScreen}/>
        <AuthenticationStack.Screen name="RegisterScreen" component={RegisterScreen}/>
    </AuthenticationStack.Navigator>
);

export default AuthenticationStackScreen;