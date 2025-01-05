const fs = require("fs");
const path = require("path");

// Read the SQL file content
const sqlFile = fs.readFileSync(
  path.join(__dirname, "../database/quran-simple.sql"),
  "utf8"
);

// Extract all values from INSERT statements
const values = [];
const lines = sqlFile.split("\n");

let currentLine = "";
for (const line of lines) {
  const trimmedLine = line.trim();

  // Skip empty lines and comments
  if (!trimmedLine || trimmedLine.startsWith("--")) continue;

  // If it's a new INSERT statement, reset currentLine
  if (trimmedLine.startsWith("INSERT INTO")) {
    currentLine = trimmedLine;
  } else {
    // Append continuation lines
    currentLine += " " + trimmedLine;
  }

  // If we have a complete statement (ends with semicolon)
  if (currentLine.endsWith(";")) {
    // Extract values between parentheses
    const matches = currentLine.match(/\((.*?)\)/g);
    if (!matches) continue;

    // Process each value set
    for (const match of matches) {
      const valueSet = match.slice(1, -1); // Remove outer parentheses
      const [index, sura, aya, text] = valueSet.split(",").map((val) => {
        val = val.trim();
        // Remove quotes if present
        if (val.startsWith("'") && val.endsWith("'")) {
          return val.slice(1, -1);
        }
        // Remove backticks if present
        if (val.startsWith("`") && val.endsWith("`")) {
          return val.slice(1, -1);
        }
        return val;
      });

      // Skip header-like rows and ensure all values are present
      if (
        index &&
        sura &&
        aya &&
        text &&
        !/index|sura|aya|text/i.test(text) &&
        !/^`/.test(index)
      ) {
        values.push(`${index}|${sura}|${aya}|${text}`);
      }
    }
    currentLine = "";
  }
}

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Write to text file
const outputFile = path.join(dataDir, "quran-simple.txt");
fs.writeFileSync(outputFile, values.join("\n"), "utf8");

console.log(
  `Converted SQL data to text format. Output saved to: ${outputFile}`
);
console.log(`Total verses converted: ${values.length}`);
