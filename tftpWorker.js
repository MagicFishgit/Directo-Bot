import tftp from "node-tftp";

function uploadTFTP(data) {

// Create a TFTP client instance
const client = tftp.createClient({
    host: '10.10.99.2',
    port: 69 // default TFTP port
});

// Upload each file to the TFTP server
data.forEach(fileName => {
    client.put(fileName, `tftp://10.10.99.2/${fileName}`, err => {
        if (err) console.error(`Failed to upload ${fileName}: ${err.message}`);
        else console.log(`Successfully uploaded ${fileName}`);
    });
});

    
}

export {uploadTFTP};