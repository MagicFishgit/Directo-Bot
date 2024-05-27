import { exec } from 'child_process';

async function checkConnection(host, port) {
  return new Promise((resolve, reject) => {
    exec(`echo -n | tftp ${host} ${port}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function uploadFiles(files) {
  const host = '10.10.99.2';
  const port = 69;

  try {
    await checkConnection(host, port);
    console.log('Connection to TFTP server successful');
  } catch (err) {
    console.error('Error connecting to the TFTP server:', err);
    return;
  }

  files.forEach(file => {
    const localFileToUpload = `./${file}`; // Local file to upload
    const remoteFileToUpload = file; // Remote file name

    exec(`tftp -p -l ${localFileToUpload} -r ${remoteFileToUpload} ${host} ${port}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error uploading file ${localFileToUpload}:`, error);
      } else {
        console.log(`File "${localFileToUpload}" uploaded as "${remoteFileToUpload}"`);
        console.log(`Upload successful: ${new Date().toLocaleString()} - File "${localFileToUpload}" uploaded to TFTP server as "${remoteFileToUpload}"`);
      }
    });
  });
}

export { uploadFiles };
