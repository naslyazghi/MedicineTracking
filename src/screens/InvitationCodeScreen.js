import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {FilledButton} from '../components/FilledButton';
// const BASE_URL = 'http://localhost:8080/';
const BASE_URL = 'http://10.0.0.5:8080/';

export function InvitationCodeScreen({navigation}) {
    const [data, setData] = React.useState({
        email: '',
        check_textInputChange: false,
        isValidEmail: true,
        message: '',
    });

    // 2 - DATA VALIDATION FOR THE USER INPUT
    // Email has to be atleast 4 charachters long
    const textInputChange = val => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidEmail: true,
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidEmail: false,
            });
        }
    };


    // Handle user if valid
    const handleValidUser = val => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                isValidEmail: true,
            });
        } else {
            setData({
                ...data,
                isValidEmail: false,
            });
        }
    };
    
    
    // 3 - Handle sending invitation code
    const sendInvitation = async (email) => {
        // Construct the Json body for the request
        const js = '{"email":"' + email + '"}';
        console.log("js = " + js);

        // Check if email is empty
        if (email.length == 0) {
            Alert.alert('Wrong Input!', 'Email cannot be empty.', [
                {text: 'OK'},
            ]);
            return;
        }

        try {
            // 1 - Make API call
            const response = await fetch(BASE_URL + 'api/admin/admin_invite', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: js,
            });

            // 2 - Parse the response
            var res = JSON.parse(await response.text());
            console.log("res = " + res);

            // 3 - Processing the response
            // Sending invitation failed
            if (!res.response) {
                console.log("response failed");
                // Set the message
                setData({
                    ...data,
                    message: res.message,
                });
                // Show an alert box
                Alert.alert('Error', res.message, [
                    {text: 'OK'},
                ]);
            }
            // Sending invitation succeeded
            else {
                console.log("response succeeded");
                // Set the message
                setData({
                    ...data,
                    message: res.message,
                });
                // Show an alert box
                Alert.alert('Success!', res.message, [
                    {text: 'OK'},
                ]);
                navigation.goBack();
            }
        } 
        catch (e) {
            console.log("exception = " + e.message);
            Alert.alert('Error', e.toString(), [{text: 'OK'}]);
            return;
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.actionBar}>
                <Text style={styles.heading}>Send Invitation Code</Text>
                <Feather
                    style={styles.backIcon}
                    name={'arrow-left-circle'}
                    color="white"
                    size={40}
                    onPress={() => {
                        navigation.goBack();
                    }}
                /> 
            </View>
            <View style={styles.body}>
                <View style={styles.inputBox}>
                    <FontAwesome name={'user-o'} style={styles.textBoxIcon}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Email'}
                        placeholderTextColor={'#868686'}
                        onChangeText={val => textInputChange(val)}
                        onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ? (
                        <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color="#0094FF" size={22} />
                        </Animatable.View>
                    ) : null}
                </View>
                {/*Email input validation message*/}
                {data.isValidEmail ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Email must be minimum 8 characters.</Text>
                    </Animatable.View>
                )}
                <FilledButton
                    title={'SEND'}
                    style={styles.loginButton}
                    onPress={() => {
                        sendInvitation(data.email);
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    actionBar:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0094FF',
        width: '100%',
        height: '30%',
        textAlign: 'center',
    },

    body:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
    },

    heading: {
        color: 'white',
        fontSize: 30,
    },

    backIcon: {
        // marginRight: 100,
        marginTop: 15,
    },

    inputBox: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#868686',
    },

    textBoxIcon: {
        color: "#0094FF", 
        fontSize: 27,
    },

    textInput: {
        flex: 1,
        fontSize: 18,
        padding: 10,
        color: '#000000',
    },

    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});
