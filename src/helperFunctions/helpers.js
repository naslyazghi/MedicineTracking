import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage';
import {Alert,} from 'react-native';
import {BASE_URL} from '../config';

const helpers = {
    getToken: async function() {
        var userToken = global.userTokenConst;
        var decoded = jwt_decode(userToken);
        // console.log("decoded = " + JSON.stringify(decoded));
        var exp = decoded.exp * 1000;
        // console.log("EXP = " + exp + " & Date.now = " + Date.now());
    
        if (Date.now() < exp)
        {
            console.log("Not Expired");
            // return false;
            return global.userTokenConst;
        }
        else
        {
            console.log("Expired");
            // return true
            var newToken = this.refreshToken();
            return newToken;
        }
    },


    refreshToken: async function() {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        console.log("Refreshing Token ...")
        console.log("refresh token = " + JSON.stringify(refreshToken));
        const response = await fetch(BASE_URL + 'api/user/token', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: refreshToken,
            }),
        });

        // console.log("token response = " + JSON.stringify(response));
        // 2 - Parsing the response
        var res = JSON.parse(await response.text());
        if (!res.response) 
        {
            console.log("response failed => response = " + res.response + " res.message = " + res.message);
            Alert.alert('Error', res.message, [
                {text: 'OK'},
            ]);
            return null;
        }
        else 
        {
            console.log("Token refreshed")
            global.userTokenConst = res.Content;
            // Update Local storage
            // await AsyncStorage.mergeItem('userToken', res.Content);
            // console.log("Token = " + JSON.stringify(res.Content));
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
