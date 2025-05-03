
const fs = require('fs');
const csv = require('csv-parser');
const { IP2Location } = require("ip2location-nodejs");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let ip2location = new IP2Location();
let ip2Asn = new IP2Location();

let ipArray = [];

// Define CSV writer for the output file
const csvWriter = createCsvWriter({
  path: './file/output.csv',
  header: [
    { id: 'ip', title: 'IP' },
    { id: 'country', title: 'Country' },
    { id: 'isp', title: 'ISP' }
  ]
});

//define input file location
fs.createReadStream('./file/input.csv')
  .pipe(csv())
  .on('data', (row) => {
    //replace ip with your ip address colum name avoid using space in your column name to avoid an error
    ipArray.push(row.ip);
  })
  .on('end', async () => {
    console.log('CSV file successfully processed');
    ip2Asn.open("./db/IP2LOCATION-LITE-ASN.BIN");
    ip2location.open("./db/IP2LOCATION-LITE-DB1.BIN");

    let resultArray = [];

    for (const ip of ipArray) {
      const country = await ip2location.getCountryLongAsync(ip);
      const isp = await ip2Asn.getASAsync(ip);
      resultArray.push({ ip, country, isp });
    }

    // Write the result to a new CSV file
    csvWriter.writeRecords(resultArray)
      .then(() => console.log('The CSV file was written successfully'));

    ip2Asn.close();
    ip2location.close();
  });
