# IP Address Resolver

This Node.js script reads a list of IP addresses from a CSV file and writes a new CSV file that includes the IP address, its country, and its ISP.

---

## 📦 What It Does

- Reads `input.csv` from the `/file` folder.
- Resolves each IP address using IP2Location `.BIN` database files.
- Outputs the results to `output.csv` with added columns for **Country** and **ISP**.

---

## 🗂️ Folder Structure
```
project-folder/
│
├── db/
│ ├── IP2LOCATION-LITE-ASN.BIN # ASN DB file (for ISP name)
│ └── IP2LOCATION-LITE-DB9.BIN # Country DB file
│
├── file/
│ ├── input.csv # Your input file (must have a column named ip)
│ └── output.csv # This file will be created with the results
│
├── node_modules/
│ └── list of dependencies( dont bother to touch or read)
│ 
|
├── index.js # The main script
├── run.bat # Batch file to run the script easily
└── README.md # This documentation
```


---

## 🛠️ Setup Instructions

1. **Install Node.js** if not already installed:  
   👉 https://nodejs.org


2. **Clone or download this repo**
click the code button to download


3. **📥 Download the IP2Location BIN Files (optional)**
  download and replace the db if you want to update the db
- Download the `.BIN` files from IP2Location:
  👉 [https://lite.ip2location.com/](https://lite.ip2location.com/)

- Place the downloaded `.BIN` files inside the `/db` folder.
  

4.  **📄 Prepare Your Input File**

- Place a CSV file named `input.csv` inside the `/file` folder.

- The CSV must have a column named `ip`, like this:

  ```csv
  ip
  8.8.8.8
  1.1.1.1


---
## 🚀 How to Run
> ⚠️ **WARNING:** The `run.bat` file will automatically install dependencies and run the script.  
> Only run it if you **understand what it's doing** and **trust the code**. It requires internet access to install packages.

Just double-click the run.bat file.

It will:
<ol>
<li>Install all dependencies</li>
<li> Read the IPs from input.csv</li>

<li> Look up the country and ISP for each</li>

<li> Save the results to output.csv inside the /file folder</li>
</ol>

---
## 📌 Notes

Do not use spaces in the column name (ip) of your CSV.

Make sure the .BIN files are kept up to date for better accuracy.

This runs locally, so there are no API limits.

---
## ✅ Example Output

| IP       | Country                | ISP                    |
|-------------------|------------------------|------------------------|
| 18.208.99.109     | United States of America| Amazon.com Inc.        |
| 128.199.86.226    | Singapore              | DigitalOcean LLC.      |


---

## 🧠 For Beginners
This script uses:

Node.js: JavaScript runtime to run backend code

CSV Parser: To read your CSV file

IP2Location: To look up where the IP is from and who owns it

CSV Writer: To save the results

You don’t need to know code to use it — just prepare the CSV and double-click the .bat file!

