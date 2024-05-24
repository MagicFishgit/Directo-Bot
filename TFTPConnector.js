import tftp from 'node-tftp'

// Create a TFTP client
export let client = tftp.createClient ({
    host: "10.10.99.2",
    port: 69
  })