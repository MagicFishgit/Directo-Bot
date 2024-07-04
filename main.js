 //Variables
 let access_token = '';
 let refresh_token = '';
 
 //Authenticate and Connect to Yeastar API (P-Series)
 import {authenticateAndConnect, refreshToken, revokeToken} from './yeastarAPIConnector.js';
 import {getExtensionList, getExtensionDetails, getExtensionsByOrganization} from './yeastarAPI.js';
 import { groupByOrganization, generateXML } from './xmlGenerator.js';
 import { uploadFiles } from './httpsWorker.js';
 import { uploadTFTP } from './tftpWorker.js';
 import { uploadFTP } from './ftpWorker.js';
 
 
 // Your credentials
 const username = 'redacted';
 const password = 'redacted';
 
 // The base URL of your Yeastar P-Series PABX
 const baseUrl = 'https://esahq.ras.yeastar.com:443';
 
 // Use the function
 async function main() {
     try {
         //Authenticate to API and get Access Tokens.
         let data = await authenticateAndConnect(username, password, baseUrl);
         console.log(data);
         access_token = data.access_token;
         refresh_token = data.refresh_token;
 
         //Get list of ALL extensions.
         const extensionList = await getExtensionList(access_token, baseUrl);
         console.log(extensionList);
 
         //Extract id's from returned data.
          let extension_ids = [];
 
         for (let item of extensionList.data){
             extension_ids.push(item.id);
         }
 
         //Print Id's for fun.
         console.log(extension_ids);
 
         //Refresh Access Token - KeepAlive
         //let refreshed_session = await refreshToken(baseUrl, refresh_token);
         //access_token = refreshed_session.access_token;
         //refresh_token = refreshed_session.refresh_token;
 
         //Get details for ail extensions by id.
          const extension_details = await getExtensionDetails(access_token, baseUrl, extension_ids);
          console.log(extension_details.data);
 
         //Get list of organizations and their extensions.
         const organization_list = await getExtensionsByOrganization(access_token, baseUrl);
  
         //Extract required values and group them in a hashmap by title.
          let result = groupByOrganization(extension_details, organization_list);
          console.log(result);
 
         //Generate XML files according to title keys.
          let filenames = await generateXML(result);
          console.log(filenames);
 
          // Usage:
         let upload = await uploadFTP(filenames);
 
         
     } catch (error) {
         console.error(error);
     }
 
     let revoke_status = await revokeToken(baseUrl, access_token);
     console.log(revoke_status);
 }
 
 main();