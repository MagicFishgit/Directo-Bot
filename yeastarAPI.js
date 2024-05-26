//Module imports
import axios from 'axios';

// Function fetch a list of all Extensions
async function getExtensionList(access_token, baseUrl) {

    // The data to send in the POST request
   
        access_token = 'access_token=' + access_token;
       // refresh_token= '&refresh_token=' + refresh_token;

    // The endpoint for authentication and request.
    const authEndpoint = '/openapi/v1.0/extension/list?' + access_token;
  

    // The headers for the GET request
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        // Send the POST request
        const response = await axios.get(baseUrl + authEndpoint);
        
        // Return the response data
        return response.data;
    } catch (error) {
        // Handle the error here
        console.error(error);
    }
}

//Function fetch details of extensions from list of extension id's
async function getExtensionDetails(access_token, baseUrl, extension_ids) {

    // The data to send in the GET request
   
    access_token = 'access_token=' + access_token;
    //refresh_token = '&refresh_token=' + refresh_token;
    let id_string = extension_ids.join(',') + '&';
    let fake_id = '8,10,14';

    // The endpoint for authentication and request.
    const authEndpoint = '/openapi/v1.0/extension/query?ids=' + id_string + access_token;
  

    // The headers for the POST request
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        // Send the POST request
        const response = await axios.get(baseUrl + authEndpoint);
        
        // Return the response data
        return response.data;
    } catch (error) {
        // Handle the error here
        console.error(error);
    }
}

//Export functions.
export {getExtensionList, getExtensionDetails};