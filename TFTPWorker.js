import {client} from './TFTPConnector.js'
// // Download a file from the server
// const remoteFile = 'remotefile.txt'; 
// // Replace with the actual remote file name
// const localFile = 'localfile.txt'; // Replace with the desired local file name
// client.get(remoteFile, localFile, (err) => {
//   if (err) {
//     console.error('Error downloading file:', err);
//   } else {
//     console.log(`File "${remoteFile}" downloaded to "${localFile}"`);
//   }
//   client.end(); // Close the connection
// });

// Upload a file to the server
const localFileToUpload = './Directory.xml'; // Replace with the local file to upload
const remoteFileToUpload = 'Directory.xml'; // Replace with the desired remote file name
client.put(localFileToUpload, remoteFileToUpload, (err) => {
  if (err) {
    console.error('Error uploading file:', err);
  } else {
    console.log(`File "${localFileToUpload}" uploaded as "${remoteFileToUpload}"`);
  }
  client.end; // Close the connection
});