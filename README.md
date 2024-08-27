
# Directobot v1.0

This project solves an issue with the Yeastar PABX systems where it is not possible to manage a directory of users / numbers and have them sync to any phone natively. 

The program makes use of the Yeastar API to pull extension information as well as organizational group designations and matches them accordingly. 

It then generates xml templates for each sub organization and a main nested template which contains all the sub organizations. 

After that is complete an FTP transfer is triggered where the xml is uploaded to the PABX. 
The admins of the system then only need to include two autoprovisioning arguments and the phone will be updated every time this is run.

-- NOTE This is only for the Yeastar P-Series Cloud and Appliance edditions. Support for S-Series will be in the next version.

# Requirements

Ubuntu Server 24.04 LTS

Runtime: nodeJS v22.4.0

Yeastar P-Series Cloud or Application edditions.

Yeastar PABX Admin Account.

Yeastar System API Key and Secret.

Organization Management enabled on the PABX and at least one subgroup created.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY` - Obtained from the Yeastar device API section after being enabled.

`API_SECRET` - Obtained from the Yeastar device API section after being enabled.

`BASE_URL` - https://your_pbx_fqdn.com:443

`FTP_USER` - Obtained from Yeastar device Storage section after being enabled.

`FTP_PASS` - OBtained from Yeastar device Storage section after being enabled.

`HOST_ADDRESS` - local network IP address for physical pabx's replace with same value as `BASE_URL` if using cloud.
# Deployment

To deploy this project do the following steps:

### Install nodeJS. 

I use Node Version Manager to manage my node runtimes. If you don't have it yet I suggest giving it a go. There are many resources out there on how to use it in your environment. 

```bash
 nvm install 22.4.0
```

```bash
 nvm use 22.4.0
```

### Install dependencies.

Run the package.json using Node Package Manager (NPM). This will install the requried dependencies and the correct versions.

```bash
  npm install
```

### Build or not to build.

There is no need to build the application as there is no user interface and it is relatively small and efficient.

### Run the program.

```bash
  node main
```

### Update the phone Auto-Provisioning template custom paramaters.

- Remove the following:

```bash
  remote_phonebook.data.1.url =  {{.CompanyPbUrl}}
  remote_phonebook.data.1.name = {{.CompanyPbName}}
  remote_phonebook.data.2.url =  {{.PersonalPbUrl}}
  remote_phonebook.data.2.name = {{.PersonalPbName}}
```

- Replace with the following:

```bash
  remote_phonebook.data.1.url =  tftp://your_pabx_ip_or_fqdn/YeastarNestedPhoneDirectory.xml
  remote_phonebook.data.1.name = your_directory_name
```

### Considerations

The program will only run once and log output to stdout and errors to stderr.
You might want to run the program periodically so I would suggest to set up a simple cronjob to run it at your specified interval. 

#### Please note the Yeastar API establishes an api session that lasts for 30 minutes and no way to destroy the session and a limit of 10 concurrent sessions. So as long as you run it at intervals >30 minutes you will not have any issues.

## License

This project is not open-source and is solely owned by the author. Use of it is at the authors discression and allowances until a formal agreement of ownership is made.


## Authors

- [@MagicFishgit](https://github.com/MagicFishgit)


## Used By

This project is used by the following companies:

- Hertex Fabrics
- ESA Partner

