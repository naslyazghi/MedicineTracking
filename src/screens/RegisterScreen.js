import React from 'react';
import {View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, Alert,} from 'react-native';
import {Heading} from '../components/Heading';
import {FilledButton} from '../components/FilledButton';
import {TextButton} from '../components/TextButton';
import {Error} from '../components/Error';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import jwt_decode from 'jwt-decode';
import {BASE_URL} from '../config';



const RegisterScreen = ({navigation}) => {
    //const {logIn} = React.useContext(AuthContext);

   //__________________________\\  
  //                            \\
 //         1 -  C O D E         \\
//________________________________\\

    //  1 - VARIABLES & STATES
    const [data, setData] = React.useState({
        invitationCode: '',
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        check_invitationCodeInputChange: false,
        check_emailInputChange: false,
        check_userNameInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidInvitationCode: true,
        isValidUser: true,
        isValidPassword: true,
        isValidEmail: true,
        message: '',
    });


    const invitationCodeInputChange = val => {
        if (val.trim().length == 36) {
            setData({
            ...data,
            invitationCode: val,
            check_invitationCodeInputChange: true,
            isValidInvitationCode: true,
            });
        } else {
            setData({
            ...data,
            invitationCode: val,
            check_invitationCodeInputChange: false,
            isValidInvitationCode: false,
            });
        }
    };


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


    // Invitation code has to b 36 charachters long
    const handleValidInvitationCode = val => {
        if (val.trim().length == 36) {
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
    const registerHandle = async (invitationCode, email, username, password, confirm_password,) => {
        console.log('login hundle');
        console.log(invitationCode.length);
        // Check if invitation code is valid
        if (invitationCode.length != 36) {
            console.log('Invitation code is not valid');
            Alert.alert('Wrong Input!', 'You need a valid invitation code.', [
            {text: 'OK'},
            ]);
            return;
        }

        // Check if email is valid
        if (email.length == 0) {
            console.log('Email is not valid');
            Alert.alert('Wrong Input!', 'You need to provide a valid Email', [
            {text: 'OK'},
            ]);
            return;
        }

        // Check if username is valid
        if (username.length == 0) {
            console.log('Username is not valid');
            Alert.alert('Wrong Input!', 'You need to provide a valid Username', [
            {text: 'OK'},
            ]);
            return;
        }

        // Password Missmatch
        if (password != confirm_password) {
            console.log('Password is not valid');
            Alert.alert('Error!', 'Passowrd matching failed', [
            {text: 'OK'},
            ]);
            return;
        }

        // Construct the Json body for the request
        const js = '{"name":"' + username + '", "email":"' + email + '", "password":"' + password + '"}';
        console.log(js);

        try {
            // 1 - Get the response from the API
            const response = await fetch(BASE_URL + 'api/user/signup/' + invitationCode, {
                method: 'POST',
                body: js,
                headers: {'Content-Type': 'application/json'},
            });

            // 2 - Parsing the response
            var res = JSON.parse(await response.text());
            console.log(res);

            // 3 - Processing the response
            // User successfully added to the database
            if (res.response) {
                console.log("Registration Succeeded");
                //setMessage('');
                setData({
                    ...data,
                    message: 'User Registred',
                });
                // Show an alert box
                Alert.alert(
                    'Medicine Tracking Registration',
                    'You have been Succesfully Registred!', 
                    [{text: 'OK'}],
                );
                navigation.navigate('LoginScreen');
                return;
            }
            // User wss not registred
            else {
                console.log("Registration failed");
                setData({
                    ...data,
                    message: res.message,
                });
                // Show an alert box
                Alert.alert(
                    'Error',
                    res.message, 
                    [{text: 'OK'}],
                );
            }
        } catch (e) {
            console.log(e.message);
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
                <View style={styles.action}>
                    <Feather name={'send'} style={styles.textBoxIcon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Invitation Code'}
                        placeholderTextColor={'#868686'}
                        onChangeText={val => invitationCodeInputChange(val)}
                        onEndEditing={e => handleValidInvitationCode(e.nativeEvent.text)}
                    />
                    {data.check_invitationCodeInputChange ? (
                        <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color="#0094FF" size={22} />
                        </Animatable.View>
                    ) : null}
                </View>

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
                            data.invitationCode,
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
        paddingVertical: 50,
    },

    title: {
        marginTop: 30,
        marginBottom: 30,
        color: '#fff',
    },

    registerButton: {
        marginTop: 25,
    },

    textInput: {
        fontSize: 18,
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        marginTop: 0,
        paddingLeft: 10,
        color: '#000000',
    },

    textBoxIcon: {
        color: "#0094FF", 
        fontSize: 27,
    },

    action: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        flexDirection: 'row',
        marginTop: 15,
        paddingHorizontal: 15,
        paddingVertical: 8,
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
