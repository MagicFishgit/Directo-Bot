import axios from 'axios';
import fs from 'fs';

function uploadFiles(file_names) {

file_names.forEach(fileName => {
  // Read the XML file
  let xmlData = fs.readFileSync(fileName, 'utf8');

  axios({
    method: 'post',
    url: 'https://esahq.ras.yeastar.com/',
    data: xmlData,
    headers: {'Content-Type': 'text/xml'}
  })
  .then(function (response) {
    console.log(`File ${fileName} uploaded successfully`);
  })
  .catch(function (error) {
    console.error(`Error uploading file ${fileName}:`, error);
  });
});

  
}

export { uploadFiles };
