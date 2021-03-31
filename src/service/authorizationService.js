import {BASE_URL} from '../config';
import axios from 'axios';


async function getNewToken(refreshToken) {
    console.log("{getNewToken} => Getting new token from the service ...");
    // console.log("Refresh token = " + refreshToken);
    try {
        const response = await axios.post(
            BASE_URL + 'api/user/token',
            {
                refreshToken: refreshToken,
            }
        );
        // alert(JSON.stringify(response.data));
        return response.data;
    }
    catch (error)
    {
        console.log("{getNewToken} => Failed to get the new token from the service ...");
        console.log("{getNewToken} => Error = " + error.response.data.message);
        // alert(error.message);
        return null;
    }
}


module.exports = {
    getNewToken,
};



