const { Parser } = require('json2csv');
const fs = require('fs');

const jsonToCSVConverter = (jsonResponse) => {
    const parserObj = new Parser();
    const csvRes = parserObj.parse(jsonResponse);

    // Creating and writing response to CSV file
    fs.writeFileSync('./metals.csv', csvRes)

    return csvRes;

};

module.exports = jsonToCSVConverter;