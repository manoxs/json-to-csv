var fs = require('fs');
const path = require('path');
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;


//Hard coded directory has been used.
//Put your path here...
const currDir = path.join(__dirname + '/site_users/');

// Function to get the filenames present
// in the directory
const readdir = (dirname) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, (error, filenames) => {
            if (error) {
                reject(error);
            } else {
                resolve(filenames);
            }
        });
    });
};

//json filter to filter out the csv files
//in the directory
const filterJsonFiles = (filename) => {
    return filename.split('.')[1] === 'json';
};


readdir(currDir).then((filenames) => {
    filenames = filenames.filter(filterJsonFiles);

    for (let i=0; i < filenames.length; i++) {
        let currFilePath = currDir + filenames[i];

        readFile(currFilePath, 'utf-8', (err, fileContent) => {
            if (err) {
                console.log(err);
                throw new Error(err);
            }

            const csvData = csvjson.toCSV(fileContent, {
                headers: 'key',
                delimiter: ",",
                wrap: false
            });

            let file = currFilePath.substr(0, currFilePath.lastIndexOf(".")) + ".csv";
            writeFile(file, csvData, (err) => {
                if(err) {
                    console.log(err);
                    throw new Error(err)
                }
                console.log('Success');
            });
        });
    }
})
    .catch(err => console.error(err))
