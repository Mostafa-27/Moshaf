const fs = require("fs");
const path = require("path");

// Cache for the parsed Quran data
let quranData = null;

// Function to load and parse the Quran text file
function loadQuranData() {
  if (quranData) return quranData;

  try {
    const filePath = path.join(__dirname, "../data/quran-simple.txt");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const lines = fileContent.split("\n").filter((line) => line.trim());

    quranData = lines.map((line) => {
      const [index, sura, aya, text] = line.split("|");
      return {
        index: parseInt(index),
        sura: parseInt(sura),
        aya: parseInt(aya),
        text: text.trim(),
      };
    });

    return quranData;
  } catch (error) {
    console.error("Error loading Quran data:", error);
    throw error;
  }
}

// Get all verses of a specific sura
function getAyatBySura(suraId) {
  const data = loadQuranData();
  return data
    .filter((item) => item.sura === parseInt(suraId))
    .sort((a, b) => a.aya - b.aya);
}

// Get a specific verse by sura and aya number
function getAyaBySuraAndNumber(suraId, ayaNumber) {
  const data = loadQuranData();
  return data.find(
    (item) => item.sura === parseInt(suraId) && item.aya === parseInt(ayaNumber)
  );
}

// Search verses by text
function searchAyat(query) {
  const data = loadQuranData();
  return data.filter((item) =>
    item.text.toLowerCase().includes(query.toLowerCase())
  );
}

// Get a range of verses
function getAyatRange(startSura, startAya, endSura, endAya) {
  const data = loadQuranData();
  return data
    .filter((item) => {
      if (startSura === endSura) {
        return (
          item.sura === parseInt(startSura) &&
          item.aya >= parseInt(startAya) &&
          item.aya <= parseInt(endAya)
        );
      }

      if (item.sura === parseInt(startSura)) {
        return item.aya >= parseInt(startAya);
      }

      if (item.sura === parseInt(endSura)) {
        return item.aya <= parseInt(endAya);
      }

      return item.sura > parseInt(startSura) && item.sura < parseInt(endSura);
    })
    .sort((a, b) => {
      if (a.sura === b.sura) {
        return a.aya - b.aya;
      }
      return a.sura - b.sura;
    });
}

module.exports = {
  getAyatBySura,
  getAyaBySuraAndNumber,
  searchAyat,
  getAyatRange,
};
