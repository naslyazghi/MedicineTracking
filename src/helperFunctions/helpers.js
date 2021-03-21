import jwt_decode from "jwt-decode";



const helpers = {
    
    checkTokenIfExpired: function() {
        var userToken = global.userTokenConst;
        // var refreshToken = global.refreshTokenConst;
        // const BASE_URL = 'http://10.0.0.5:8080/';
    
        var decoded = jwt_decode(userToken);
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
    },
    
    refreshToken: function() {
    
    },
}

export default helpers;
