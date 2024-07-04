import PromiseFtp from 'promise-ftp';

async function uploadFTP(file_names) {
    const ftp = new PromiseFtp();
    try {
        await ftp.connect({
            host: "10.10.99.2",
            port: 21,
            user: "redacted",
            password: "redacted"
        });

        for (let fileName of file_names) {
            try {
                let filePath = `${fileName}`;
                await ftp.put(filePath, `./tftpboot/${fileName}`);
                console.log(`Successfully uploaded ${fileName}`);
            } catch (err) {
                console.error(`Failed to upload ${fileName}: ${err.message}`);
            }
        }
    } catch (err) {
        console.error(`Error connecting to FTP server: ${err.message}`);
    } finally {
        try {
            await ftp.end();
        } catch (err) {
            console.error(`Error ending FTP connection: ${err.message}`);
        }
    }
}

export { uploadFTP };
