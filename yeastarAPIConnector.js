//const axios = require('axios');
import axios from 'axios';

// Function to authenticate and connect to a Yeastar P-Series PABX.
async function authenticateAndConnect(username, password, baseUrl) {
    // The endpoint for authentication.
    const authEndpoint = '/openapi/v1.0/get_token';

    // The data to send in the POST request.
    const authData = {
        username: username,
        password: password
    };

    // The headers for the POST request.
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        // Send the POST request.
        const response = await axios.post(baseUrl + authEndpoint, authData, { headers: headers });
        
        // Return the response data.
        return response.data;
    } catch (error) {
        // Handle the error here.
        console.error(error);
    }
}

//Function to refresh token lifetime.
async function refreshToken(baseUrl, refresh_token) {

    // The endpoint for authentication and query.
    const authEndpoint = '/openapi/v1.0/refresh_token';

      // The data to send in the POST request.
      const authData = {
        refresh_token: refresh_token,
    };

    // The headers for the POST request.
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        // Send the POST request.
        const response = await axios.post(baseUrl + authEndpoint, authData, { headers: headers });
        
        // Return the response data.
        return response.data;
    } catch (error) {
        // Handle the error here.
        console.error(error);
    }
}

    //Function to revoke access token.
async function revokeToken(baseUrl, access_token) {

    // The endpoint for authentication and query.
    const authEndpoint = '/openapi/v1.0/del_token?access_token=';

    try {
        // Send the GET request
        const response = await axios.get(baseUrl + authEndpoint + access_token);
        
        // Return the response data
        return response.data;
    } catch (error) {
        // Handle the error here
        console.error(error);
    }
}

// Export the function
export {authenticateAndConnect, refreshToken, revokeToken};
