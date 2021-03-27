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
        alert(error.message);
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
        alert(error.message);
        return null;
    }
}

// Get orders list by path recursive
async function getOrdersByPathRecursive(action, resource, path, token) {
    console.log("action = " + action);
    console.log("resource = " + resource);
    console.log("path = " + path);
    console.log("token = " + JSON.stringify(token));
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
        alert(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        // handle error
        alert(error.message);
        return null;
    }
}

module.exports = {
    getOrdersList,
    getOrdersByPath,
    getOrdersByPathRecursive,
};



