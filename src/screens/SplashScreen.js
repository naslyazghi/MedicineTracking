import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-ionicons';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { Bold } from 'react-feather';
import { Button } from '@material-ui/core';


const SplashScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    animation='bounceIn'
                    duraton="1500"
                    source={require('../../src/assets/images/logo_2.png')}
                    style={styles.logo}
                    resizeMode='stretch'
                />
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.title}>Track your inventory & shipement</Text>
                <Text style={styles.text}>In the most easy way!</Text>
                < View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.textSign}>Get Started  </Text>
                        <Feather name="arrow-right" color="#0094FF" size={20}/>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.09;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#FFFFFF'
    },

    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    footer: {
        flex: 1,
        backgroundColor: '#0094FF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },

    logo: {
        width: 250,
        height: height_logo
    },

    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },

    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop:5
    },

    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },

    signIn: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginTop: 30,
        width: 150,
        height: 40,
        justifyContent: 'center',
        padding: 10,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        backgroundColor: 'white'
    },

    textSign: {
        color: '#0094FF',
        fontSize: 15,
        fontWeight: 'bold'
    }
});