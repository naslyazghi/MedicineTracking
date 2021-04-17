import React from 'react';
import {View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, Alert,} from 'react-native';
import {Heading} from '../components/Heading';
import {FilledButton} from '../components/FilledButton';
import {TextButton} from '../components/TextButton';
import {Error} from '../components/Error';
// import {AuthContainer} from '../components/AuthContainer';
import {AuthContext} from '../contexts/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import jwt_decode from "jwt-decode";
import {BASE_URL} from '../config';




const LoginScreen = ({navigation}) => {

   //__________________________\\  
  //                            \\
 //         1 -  C O D E         \\
//________________________________\\


    //  1 - VARIABLES & STATES
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidEmail: true,
        isValidPassword: true,
        message: '',
    });

    const {logIn} = React.useContext(AuthContext);


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

    // Switch the secure text entry for the password
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
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


    // 3 - lOGIN HANDLING
    const loginHandle = async (email, password) => {
        // Construct the Json body for the request
        const js = '{"email":"' + email + '","password":"' + password + '"}';

        console.log(js);

        // email or Password is empty
        if (email.length == 0 || password.length == 0) {
            Alert.alert('Wrong Input!', 'Email or password field cannot be empty.', [
            {text: 'OK'},
            ]);
            return;
        }

        try {
            // 1 - Response variable from the API
            console.log("Logging in...");
            const response = await fetch(BASE_URL + 'api/user/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: js,
            });
            console.log("Login => Response = " + JSON.stringify(response));
            // 2 - Parsing the response
            var res = JSON.parse(await response.text());

            // 3 - Processing the response
            // User not found
            if (res.response != true) {
                //setMessage('User/Password combination incorrect');
                console.log("response failed");
                setData({
                    ...data,
                    message: res.message,
                });
                // Show an alert box
                Alert.alert('Error', res.message, [
                    {text: 'OK'},
                ]);
                return;
            }
            // User found
            else {
                console.log("response succeeded, res.message = " + res.message);
                var tokenResponse = res.content;
                console.log("tokenResponse = " , tokenResponse);
                // Decode the token
                try{
                    var decoded = jwt_decode(tokenResponse.token);
                    console.log("decoded = " + JSON.stringify(decoded));
                }
                catch(e){
                    console.log("Exception message = " + e.message);
                }
                //localStorage.setItem('user_data', JSON.stringify(user));

                // Set the message
                setData({
                    ...data,
                    message: 'Login is successful',
                });

                // Store the user Info
                var user = {
                    id: decoded.user._id,
                    name: decoded.user.name,
                    userToken: tokenResponse,
                };
                
                // Show an alert box
                // Alert.alert(
                //     'Medicine Tracking',
                //     'Login Successful\nid: ' +
                //     user.id +
                //     '\nname: ' +
                //     user.name
                // );

                // lOGIN the user
                logIn(user);

                return;
                // Direct the user to the main screen
                // window.location.href = '/cards';
            }
        } 
        catch (e) {
            Alert.alert('Error', e.toString(), [{text: 'OK'}]);
            return;
        }

    // if ( foundUser.length == 0 ) {
    //   Alert.alert('Invalid User!', 'email or password is incorrect.', [
    //     {text: 'Okay'}
    // ]);
    // return;
    // }

    // logIn(email, password);
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
                
                {/*LOGIN title*/}
                <Heading style={styles.title}>Login</Heading>

                {/*Error Message*/}
                <Error error={''} />
            </Animatable.View>

            <View style={styles.loginContainer}>
                {/*Email input field*/}
                <View style={styles.action}>
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
                    {/* <Text style={styles.errorMsg}>Email must be minimum 8 characters.</Text> */}
                </Animatable.View>
                )}

                {/*Password input field*/}
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
                        <Feather name="eye-off" color="#868686" size={22} />
                        ) : (
                        <Feather name="eye" color="#0094FF" size={22} />
                        )}
                    </TouchableOpacity>
                </View>

                {/*Password input validation message*/}
                {data.isValidPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>
                        Password must be minimum 8 characters.
                    </Text>
                </Animatable.View>
                )}

                {/*Forgot password text button*/}
                <TextButton
                    style={[{marginTop: 30}]}
                    title={'Forgot Password?'}
                    onPress={() => {}}
                />

                {/*Login Button*/}
                <FilledButton
                    title={'Login'}
                    style={styles.loginButton}
                    onPress={() => {
                        loginHandle(data.email, data.password);
                    }}
                />
                {/*onPress={() => navigation.navigate()}/>*/}

                {/*Create an account text button*/}
                <TextButton
                    title={"Don't have an account?  Create one"}
                    onPress={() => navigation.navigate('RegisterScreen')}
                />
            </View>
        </View>
    );
};

export default LoginScreen;




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

    loginContainer :{
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

    loginButton: {
        marginVertical: 23,
    },

    textInput: {
        fontSize: 18,
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        // marginTop: 0,
        paddingHorizontal: 10,
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
