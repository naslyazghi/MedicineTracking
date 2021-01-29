import React from 'react';
import {View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, Alert,} from 'react-native';
import {Heading} from '../components/Heading';
import {FilledButton} from '../components/FilledButton';
import {TextButton} from '../components/TextButton';
import {Error} from '../components/Error';
//import {AuthContainer} from '../components/AuthContainer';
//import {AuthContext} from '../contexts/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import jwt_decode from 'jwt-decode';
//const BASE_URL = 'https://cop4331-test-2.herokuapp.com/';




const RegisterScreen = ({navigation}) => {
    //const {logIn} = React.useContext(AuthContext);

   //__________________________\\  
  //                            \\
 //         1 -  C O D E         \\
//________________________________\\

    //  1 - VARIABLES & STATES
    const [data, setData] = React.useState({
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        check_emailInputChange: false,
        check_userNameInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isValidEmail: true,
        message: '',
    });



    // 2 - DATA VALIDATION FOR THE USER INPUT
    // Email has to be atleast 10 charachters long
    const emailInputChange = val => {
        if (val.trim().length >= 10) {
            setData({
            ...data,
            email: val,
            check_emailInputChange: true,
            isValidEmail: true,
            });
        } else {
            setData({
            ...data,
            email: val,
            check_emailInputChange: false,
            isValidEmail: false,
            });
        }
    };

    // UserName has to be at least 4 charachters long
    const userNameInputChange = val => {
        if (val.trim().length >= 4) {
            setData({
            ...data,
            username: val,
            check_userNameInputChange: true,
            isValidUser: true,
            });
        } else {
            setData({
            ...data,
            username: val,
            check_userNameInputChange: false,
            isValidUser: false,
            });
        }
    };

    // Username has to be atleast 4 charachters long
    const handleValidUser = val => {
        if (val.trim().length >= 4) {
            setData({
            ...data,
            isValidUser: true,
            });
        } else {
            setData({
            ...data,
            isValidUser: false,
            });
        }
    };

    // Email has to be atleast 4 charachters long
    const handleValidEmail = val => {
        if (val.trim().length >= 10) {
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

    // Password has to be at least 8 charachters long
    const handlePasswordChange = val => {
        if (val.trim().length >= 6) {
            setData({
            ...data,
            password: val,
            isValidPassword: true,
            });
        } else {
            setData({
            ...data,
            password: val,
            isValidPassword: false,
            });
        }
    };

    //  Validate confirmed password
    const handleConfirmPasswordChange = val => {
        setData({
            ...data,
            confirm_password: val,
        });
    };

    // Handle secured password entry
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };


    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry,
        });
    };



    // 3 - REGISTERING HANDELING
    const registerHandle = async (email, username, password, confirm_password,) => {
        // email = "test@test.com";
        // username = "testes";
        // password = "123456789";
        try {
            // 1 - Respone variable from the API
            const response = await fetch(BASE_URL + 'api/users/register', {
                method: 'POST',
                body: js,
                headers: {'Content-Type': 'application/json'},
            });

            // 2 - Parsing the response
            var res = JSON.parse(await response.text());
            console.log(res);

            // 3 - Processing the response
            // User successfully added to the database
            if (res.name === username) {
                var user = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    id: res.id,
                };

                //setMessage('');
                setData({
                    ...data,
                    message: 'User Registred',
                });
                // Show an alert box
                Alert.alert(
                    'Medicine Tracking Registration',
                    'You have been Succesfully Registred\nUsername: ' +
                    res.name +
                    '\nEmail: ' +
                    res.email, 
                    [{text: 'OK'}],
                );

                navigation.navigate('LoginScreen');
                return;
                // TODO: Direct the user to the main screen
            }
            // User wss not added to the database
            else {
                setData({
                    ...data,
                    message: 'User failed to register',
                });
                if (res.email != undefined) {
                    Alert.alert('Error', res.email, [{text: 'OK'}]);
                    return;
                } else if (res.name != undefined) {
                    Alert.alert('Error', res.name, [{text: 'OK'}]);
                    return;
                } else if (res.password != undefined) {
                    Alert.alert('Error', res.password, [{text: 'OK'}]);
                    return;
                }
            }
        } catch (e) {
            Alert.alert('Error', e.toString(), [{text: 'OK'}]);
            return;
        }
    };






   //__________________________________\\  
  //                                    \\
 //        2 -   U I  D E S I G N        \\
//________________________________________\\






    return (
        <View style={styles.container}>
            <Animatable.View style={styles.headerContainer} animation="fadeInDownBig">
                {/*Show Status bar on top of the screen*/}
                <StatusBar backgroundColor="#1B1921" barstyle="light-content" />
                
                {/*Register title*/}
                <Heading style={styles.title}>Register</Heading>

                {/*Error Message*/}
                <Error error={''} />
            </Animatable.View>

            <View style={styles.registerContainer}>
                {/*email*/}
                <View style={styles.action}>
                <Feather name={'mail'} style={styles.textBoxIcon} />
                <TextInput
                    style={styles.textInput}
                    placeholder={'email'}
                    placeholderTextColor={'#868686'}
                    onChangeText={val => emailInputChange(val)}
                    onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
                />
                {data.check_emailInputChange ? (
                    <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="#0094FF" size={22} />
                    </Animatable.View>
                ) : null}
                </View>
                {/*Show error messgae for a non valid email*/}
                {data.isValidEmail ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>email must be 10 characters long.</Text>
                </Animatable.View>
                )}

                {/*UserName*/}
                <View style={styles.action}>
                <FontAwesome name={'user-o'} style={styles.textBoxIcon} />
                <TextInput
                    style={styles.textInput}
                    placeholder={'UserName'}
                    placeholderTextColor={'#868686'}
                    onChangeText={val => userNameInputChange(val)}
                    onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                />
                {data.check_userNameInputChange ? (
                    <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="#0094FF" size={22} />
                    </Animatable.View>
                ) : null}
                </View>
                {/*Show error messgae for a non valid userName*/}
                {data.isValidUser ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>User must be 4 characters long.</Text>
                </Animatable.View>
                )}

                {/*Password*/}
                <View style={styles.action}>
                    <Feather name={'lock'} style={styles.textBoxIcon}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Password'}
                        placeholderTextColor={'#868686'}
                        secureTextEntry={data.secureTextEntry ? true : false}
                        onChangeText={val => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? (
                        <Feather name="eye-off" color="grey" size={22} />
                        ) : (
                        <Feather name="eye" color="#0094FF" size={22} />
                        )}
                    </TouchableOpacity>
                </View>
                {/*Show error messgae for a non valid Password*/}
                {data.isValidPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>
                    Password must be 6 characters long.
                    </Text>
                </Animatable.View>
                )}

                {/*retype password*/}
                <View style={styles.action}>
                <Feather name={'lock'} style={styles.textBoxIcon}/>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Confirm Password'}
                    placeholderTextColor={'#868686'}
                    secureTextEntry={data.secureTextEntry ? true : false}
                    onChangeText={val => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                    {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={22} />
                    ) : (
                    <Feather name="eye" color="#0094FF" size={22} />
                    )}
                </TouchableOpacity>
                </View>
                {/*Show error messgae for a non valid email*/}
                {/* { data.isValidPassword ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                </Animatable.View>
                } */}

                {/*Register*/}
                <FilledButton
                    title={'Register'}
                    style={styles.registerButton}
                    onPress={() => {
                        registerHandle(
                        data.email,
                        data.username,
                        data.password,
                        data.confirm_password,
                        );
                    }}
                />
            </View>
        </View>
    );
};






   //____________________________\\  
  //                              \\
 //       3 -  S T Y L E S         \\
//__________________________________\\




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    headerContainer :{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0094FF',
        paddingTop: 30,
        paddingBottom: 10,
    },

    registerContainer :{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingVertical: 60,
    },

    title: {
        marginTop: 30,
        marginBottom: 30,
        color: '#fff',
    },

    registerButton: {
        marginVertical: 23,
    },

    textInput: {
        fontSize: 18,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#000000',
    },

    textBoxIcon: {
        color: "#0094FF", 
        fontSize: 27,
    },

    action: {
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#868686',
    },

    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});






export default RegisterScreen;
