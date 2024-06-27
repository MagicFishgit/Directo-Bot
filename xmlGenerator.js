//Import statements.
import fs from 'fs';
import xml2js from 'xml2js';

//Function to extract required data and group them by keys via the title value.
function groupByOrganization(extension_details, organization_list) {
    let grouped_org_data = {};
    let full_data = {};

    // data.forEach(item => {
    //     let title = item.title || 'untitled';
    //     if (!groupedData[title]) {
    //         groupedData[title] = [];
    //     }
    //     groupedData[title].push({
    //         first_name: item.first_name || '',
    //         last_name: item.last_name || '',
    //         caller_id: item.caller_id || ''
    //     });
    // });

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
                        name: callerData.first_name,
                        surname: callerData.last_name,
                        callerId: callerData.caller_id
                    });
                }
            }
        });
    });
    
    console.log(full_data);
    
    return full_data;
};

function generateXML(data){

    let xml_file_names = [];

        Object.keys(data).forEach((key) => {
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

            //Add the xml file names to return array.
            xml_file_names.push(fileName);

            fs.writeFile(fileName, xml, (err) => {
                if (err) throw err;
                console.log(`File ${fileName}.xml has been saved!`);
            });
        });

        //Return the array of file names.
        return xml_file_names;
}

//Export functions.
export {groupByOrganization, generateXML};