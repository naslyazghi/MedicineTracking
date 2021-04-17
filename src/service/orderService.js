import {BASE_URL} from '../config';
import axios from 'axios';

// Get full orders list (Dev Only)
async function getOrdersList() {
    try {
        const response = await axios.get(BASE_URL + 'api/order/');
        alert(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        // handle error
        alert(error.response.data.message);
        return null;
    }
}

// Get orders list by path
async function getOrdersByPath(action, resource, path, token) {
    try {
        const response = await axios.get(BASE_URL + 'api/order/');
        alert(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        // handle error
        alert(error.response.data.message);
        return null;
    }
}

// Get orders list by path recursive
async function getOrdersByPathRecursive(action, resource, path, token) {
    console.log("action = " + action);
    console.log("resource = " + resource);
    console.log("path = " + path);
    console.log("token = " + token);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.post(
            BASE_URL + 'api/order/by_path/recursive', 
            {
                action: action,
                resource: resource,
                path: path,
            },
            config
        );
        console.log("Successfuly got the orders by path recursive");
        return response.data;
    } 
    catch (error) 
    {
        console.log("Failed to get orders by path recursive");
        console.log("Error = " + error.response.data.message);
        return null;
    }
}

// Post order location and message
async function postOrderInfo(ordernum, location, status, msg, token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    console.log("status = " + status);
    const response = axios.put(BASE_URL + 'api/order/by_order_number/log', {
        orderNumber: ordernum, 
        currentLocation: location,
        status: status,
        message: msg
    }, config).then( response => {
        console.log("Successfuly posted order info");
        console.log(response.data)
        return response.data;
    }).catch(error => {
        console.log(error)
    });
}


// Post order location and message
async function updateOrder(order, token) {
    console.log("Update Order => order = " + JSON.stringify(order));
    console.log("Update Order => token = " + token);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = axios.put(
        `${BASE_URL}api/order/by_id`, 
        order,
        config
    )
    .then( (response) => {
        if (response.data.error != undefined) throw response.data;
        console.log("Updated order Successfully => " + response.data.message);
        return response.data;
    })
    .catch((error) => {
        console.log("Updated order response Error = " + error);
        return {
            success: false,
            message: error,
            content: null,
        }; 
    });
    return response;
}


async function GetStatusOptions(token) {
    console.log("GetStatusOptions => token = " + token);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = axios.get(
        `${BASE_URL}api/config/orderStatusOptions`, 
            config
        )
        .then( (response) => {
            if (response.data.error != undefined) throw response.data;
            console.log("GetStatusOptions Successfully => " + response.data.message);
            return response.data;
        })
        .catch((error) => {
            console.log("GetStatusOptions response Error = " + error);
            return {
                success: false,
                message: error,
                content: null,
            }; 
        });

    return response;
}




module.exports = {
    getOrdersList,
    getOrdersByPath,
    getOrdersByPathRecursive,
    postOrderInfo,
    updateOrder,
    GetStatusOptions,
};



