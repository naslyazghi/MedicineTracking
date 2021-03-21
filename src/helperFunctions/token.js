import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';

class Token extends Component{
    userToken = global.userTokenConst;
    refreshToken = global.refreshTokenConst;
    BASE_URL = 'http://10.0.0.5:8080/';
    
    // getToken = async() => {
    //     var decoded = jwt_decode(this.userToken);
    //     console.log("decoded = " + JSON.stringify(decoded));
    //     var exp = decoded.exp * 1000;
    //     console.log("EXP = " + exp + " & Date.now = " + Date.now());

    //     if (Date.now() < exp)
    //     {
    //         console.log("Token is not expired");
    //         return this.userToken;
    //     }
    //     else
    //     {
    //         console.log("Token is expired");
    //         //var js = '{"refreshToken":"' + this.refreshToken + '"}';
    //         //console.log("js = " + js);
    //         var response = await fetch(this.BASE_URL + 'api/user/token', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 refreshToken: this.refreshToken,
    //             }),
    //         });
            

    //         console.log("token response = " + JSON.stringify(response));
    //         // 2 - Parsing the response
    //         var res = JSON.parse(await response.text());
    //         if (!res.response) 
    //         {
    //             Alert.alert('Error', res.message, [
    //                 {text: 'OK'},
    //             ]);
    //             return null;
    //         }
    //         else 
    //         {
    //             global.userTokenConst = res.Content;
    //             // Update Local storage
    //             await AsyncStorage.mergeItem('userToken', res.Content);
    //             return global.userTokenConst;
    //         }
    //     }
    // };


    checkTokenIfExpired = async() => {
        var decoded = jwt_decode(this.userToken);
        console.log("decoded = " + JSON.stringify(decoded));
        var exp = decoded.exp * 1000;
        console.log("EXP = " + exp + " & Date.now = " + Date.now());

        if (Date.now() < exp)
        {
            console.log("Not Expired");
            return false;
        }
        else
        {
            console.log("Expired");
            return true
        }
    }



}

module.exports = Token;