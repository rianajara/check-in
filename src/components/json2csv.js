//reference : https://attacomsian.com/blog/nodejs-convert-json-to-csv

//package installation: npm install json-2-csv --save
//to test it navigate to ocmponents on terminal
// run 'node json2csv.js'
// it should create or modify the filename.json into filename.csv

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