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

    try {
      ip2Asn.open("./db/IP2LOCATION-LITE-ASN.BIN")
      ip2location.open("./db/IP2LOCATION-LITE-DB1.BIN")

      let resultArray = []

      for (const ip of ipArray) {
        console.log(`🔍 Processing ${ip}...`)
        const country = await ip2location.getCountryLongAsync(ip)
        const isp = await ip2Asn.getASAsync(ip)
        resultArray.push({ ip, country, isp })
      }

      await csvWriter.writeRecords(resultArray)

      console.log("✅ The CSV file was written successfully.")
      console.log("📂 You can view the result (output.csv) in the /file folder.")
      console.log("🟢 All done! You can close the terminal now.")

    } catch (error) {
      console.error("❌ An error occurred:", error.message)
      console.log("👉 If this issue persists, report it at: https://github.com/muhdyusuf/ip2loaction_nodejs/issues")
    } finally {
      ip2Asn.close()
      ip2location.close()
    }
  })
