//reference : https://attacomsian.com/blog/nodejs-convert-json-to-csv

//Command to test it. Takes a json file and then creates a .csv with the json file name
toCSV('infoList.json');

function toCSV(fileName) {

    // require json-2-csv module
    const converter = require('json-2-csv');
    const fs = require('fs');


    // read JSON from a file
    const todos = JSON.parse(fs.readFileSync(fileName));

    // convert JSON array to CSV string
    converter.json2csv(todos, (err, csv) => {
        if (err) {
          throw err;
       }

    // print CSV string
    console.log(csv);

    //Removes the extension (.json) from the filename
    const fileNameSpliced = fileName.replace(/\.[^/.]+$/, "");
    
    // write CSV to a file
    fs.writeFileSync(fileNameSpliced + '.csv', csv);
    
});
}