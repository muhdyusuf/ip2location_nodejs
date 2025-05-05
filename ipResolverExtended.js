const fs = require("fs")
const csv = require("csv-parser")
const { IP2Location } = require("ip2location-nodejs")
const createCsvWriter = require("csv-writer").createObjectCsvWriter

let ip2location = new IP2Location()
let ip2Asn = new IP2Location()

let ipArray = []

// Define CSV writer for the output file
const csvWriter = createCsvWriter({
  //define output file location
  path: "./file/output.csv",
  header: [
    { id: "ip", title: "IP" },
    { id: "country", title: "Country" },
    { id: "isp", title: "ISP" },
    {id:"countryShort",title:"Country Code"},
    {id:"region",title:"Region"},
    {id:"city",title:"City"},
    {id:"zipCode",title:"Zip Code"},
    {id:"longitude",title:"longitude"},
    {id:"latitude",title:"latitude"}
  ],
})

//define input file location
fs.createReadStream("./file/input.csv")
  .pipe(csv())
  .on("data", (row) => {
    ipArray.push(row.ip)
  })
  .on("end", async () => {
    console.log("📄 CSV file loaded. Starting IP lookup...")
    console.time("⏱️ Processing Time") // Start timing   

    try {
      ip2Asn.open("./db/IP2LOCATION-LITE-ASN.BIN")
      ip2location.open("./db/IP2LOCATION-LITE-DB9.BIN")

      let resultArray = []

      for (const _ip of ipArray) {
        console.log(`🔍 Processing ${_ip}...`)
        const {ip,ipNo,countryShort,countryLong,region,city,zipCode,longitude,latitude} = await ip2location.getAll(_ip)
        const isp = await ip2Asn.getASAsync(_ip)
        resultArray.push({ ip,country:countryLong,isp,countryShort,region,city,zipCode,longitude,latitude})
        console.log({ip,ipNo,countryShort,countryLong,isp,region,city,zipCode,longitude,latitude})
      }

      await csvWriter.writeRecords(resultArray)

      console.log("✅ The CSV file was written successfully.")
      console.log("📂 You can view the result (output.csv) in the /file folder.")
      

    } catch (error) {
      console.error("❌ An error occurred:", error.message)
      console.log("👉 If this issue persists, report it at: https://github.com/muhdyusuf/ip2location_nodejs/issues")
    } finally {
      ip2Asn.close()
      ip2location.close()
      console.timeEnd("⏱️ Processing Time") // End timing
      console.log("🟢 All done! You can close the terminal now.")
    }
  })
