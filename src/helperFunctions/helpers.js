import React from 'react';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage';
import {Alert,} from 'react-native';
import {BASE_URL} from '../config';
import {getNewToken} from '../service/authorizationService';



const helpers = {
    getToken: async function() {
        // var userToken = global.userTokenConst;
        var userToken = await AsyncStorage.getItem('userToken');
        console.log("{getToken} => Current token = " + JSON.stringify(userToken));
        
        var isTokenExpired = await this.checkTokenIfExpired().then(data => data);
        if (isTokenExpired)
        {
            console.log("{getToken} => Expired");
            var newToken = await this.refreshToken().then(data => data);
            console.log("{getToken} => Updated New Token = " + newToken);
            // Update local storage
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.setItem('userToken', newToken);

            return newToken;
        }
        else
        {
            console.log("{getToken} => Not Expired");
            // return global.userTokenConst;
            return userToken;
        }
    },



    checkTokenIfExpired: async function() {
        // var userToken = global.userTokenConst;
        var userToken = await AsyncStorage.getItem('userToken');
        var decoded = jwt_decode(userToken);
        var exp = decoded.exp * 1000;
        if (Date.now() < exp)
        {
            return false;
        }
        else
        {
            return true
        }
    },



    checkRefreshTokenIfExpired: async function() {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        var decoded = jwt_decode(refreshToken);
        var exp = decoded.exp * 1000;
        if (Date.now() < exp)
        {
            console.log("valid refresh token!!");
            return false;
        }
        else
        {
            console.log("invalid refresh token!!");
            return true
        }
    },


    
    refreshToken: async function() {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        console.log("{refreshToken} => refresh token = " + JSON.stringify(refreshToken));

        const res = await getNewToken(refreshToken);

        // 2 - Parsing the response
        // var res = JSON.parse(await response.text());
        if (!res.response) 
        {
            console.log("{refreshToken} => response failed => response = " + res.response + " res.message = " + res.message);
            console.log("{refreshToken} => error = " + res.message);
            // Alert.alert('Error', res.message, [
            //     {text: 'OK'},
            // ]);
            return null;
        }
        else 
        {
            console.log("{refreshToken} => Token refreshed");
            global.userTokenConst = res.Content;
            // Update Local storage
            // await AsyncStorage.mergeItem('userToken', res.Content);
            console.log("{refreshToken} => New Token = " + JSON.stringify(res.Content));
            return res.Content;
        }
    },



    decodeToken: async function(token) {
        var decoded = jwt_decode(token);
        console.log("decoded = " + JSON.stringify(decoded));
        return decoded;
    },



    getColor: function(status) {
        const color = status === "CANCELED" || status === "DELAYED" ? 
            '#d90041' 
            : 
            (status === "COMPLETE" ? '#00b884' : '#0094FF');
        
        return color;
    }
}

export default helpers;
