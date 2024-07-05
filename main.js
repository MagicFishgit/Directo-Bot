 //Variables
 let access_token = '';
 let refresh_token = '';
 
 //Authenticate and Connect to Yeastar API (P-Series)
 import {authenticateAndConnect, refreshToken, revokeToken} from './yeastarAPIConnector.js';
 import {getExtensionList, getExtensionDetails, getExtensionsByOrganization} from './yeastarAPI.js';
 import { groupByOrganization, generateXML } from './xmlGenerator.js';
 import { uploadFiles } from './httpsWorker.js'; //Import leftover for future development.
 import { uploadTFTP } from './tftpWorker.js'; //Import leftover for future development.
 import { uploadFTP } from './ftpWorker.js';
 
 
 //Credentials
 const username = 'redacted';
 const password = 'redacted';
 
 //The base URL of your Yeastar P-Series PABX
 const baseUrl = 'https://esahq.ras.yeastar.com:443';
 
 //Main function for execution logic. Calls relevant functions as needed.
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
 
         //Get details for all extensions by id.
          const extension_details = await getExtensionDetails(access_token, baseUrl, extension_ids);
          console.log(extension_details.data);
 
         //Get list of organizations and their extensions id.
         const organization_list = await getExtensionsByOrganization(access_token, baseUrl);
  
         //Extract required values and group them by matching id.
          let result = groupByOrganization(extension_details, organization_list);
          console.log(result);
 
         //Generate XML files according to organization names.
          let filenames = await generateXML(result);
          console.log(filenames);
 
          //Upload xml files via FTP:
          await uploadFTP(filenames);
 
         
     } catch (error) {
         console.error(error);
     }
 
    //Revoke API access for the current session.
     let revoke_status = await revokeToken(baseUrl, access_token);
     console.log(revoke_status);
 }
 
 main();