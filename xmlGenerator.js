//Import statements.
import fs from 'fs';
import xml2js from 'xml2js';

//Function to extract required data and group them by keys via the title value.
function groupByOrganization(extension_details, organization_list) {
    let grouped_org_data = {};
    let full_data = {};

    //Group organization list into object with organization name and list of extensions.
    organization_list.organization_list[0].children.forEach( item => {
        let org_name = item.name;
        let extension_list = item.ext_list;
        
        //load grouped_org_data with empty object
        if (!grouped_org_data[org_name]){
            grouped_org_data[org_name] = [];
        }
        //push extensions onto array.
        grouped_org_data[org_name].push(item.ext_list);
        console.log("GROUPGROUPGROUP");
        console.log(grouped_org_data);
    });

    //Group extension list into object with organization name and object with extension + name and surname.
    Object.entries(grouped_org_data).forEach(([org_name, extensions]) => {
        if (!full_data[org_name]) {
            full_data[org_name] = [];
        }
    
        extensions.forEach(extItem => {
            for (let element of extItem){
                let callerData = extension_details.data.find(item2 => item2.id === element);
    
                if (callerData) {
                    full_data[org_name].push({
                        first_name: callerData.first_name,
                        last_name: callerData.last_name,
                        caller_id: callerData.caller_id,
                    });
                }
            }
        });
    });
    
    console.log(full_data);
    
    return full_data;
};

async function generateXML(data) {
    let xml_file_names = [];

    for (let key of Object.keys(data)) {
        let builder = new xml2js.Builder();
        let xml = builder.buildObject({
            YeastarIPPhoneDirectory: data[key].map((item) => ({
                DirectoryEntry: {
                    Name: item.first_name + ' ' + item.last_name,
                    Telephone: item.caller_id,
                },
            })),
        });

        // Replace slashes in the file name
        let fileName = `${key.replace(/\//g, '-')}.xml`;

        // Add the xml file names to return array.
        xml_file_names.push(fileName);

        try {
            await fs.promises.writeFile(fileName, xml);
            console.log(`File ${fileName}.xml has been saved!`);
        } catch (err) {
            console.error(err);
        }
    }

    // Generate nested xml file from all file names.
    let builder = new xml2js.Builder();
    let YeastarIPPhoneMenu = {
        Title: "Hertex Sites",
        MenuItem: xml_file_names.map(name => (
            {
                Name: name,
                URL: `tftp://10.10.99.2/${name}`
            }
        ))
    };

    let xml = builder.buildObject({YeastarIPPhoneMenu});
    try {
        await fs.promises.writeFile('YeastarNestedPhoneDirectory.xml', xml);
        console.log('File YeastarNestedPhoneDirectory.xml has been saved!');
    } catch (err) {
        console.error(err);
    }

    xml_file_names.push('YeastarNestedPhoneDirectory.xml');

    // Return the array of file names.
    return xml_file_names;
}

//Export functions.
export {groupByOrganization, generateXML};