//Import statements.
import fs from 'fs';
import xml2js from 'xml2js';

//Function to extract required data and group them by keys via the title value.
function groupByTitle(data) {
    let groupedData = {};

    data.forEach(item => {
        let title = item.title || 'untitled';
        if (!groupedData[title]) {
            groupedData[title] = [];
        }
        groupedData[title].push({
            first_name: item.first_name || '',
            last_name: item.last_name || '',
            caller_id: item.caller_id || ''
        });
    });

    return groupedData;
}


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
export {groupByTitle, generateXML};