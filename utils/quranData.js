const fs = require("fs");
const path = require("path");

// Cache for the parsed Quran data
let quranData = null;
const QuranData2 = require("./Quran");

const QuranData = {
  Page: [
    // [sura, aya]
    [],
    [1, 1],
    [2, 1],
    [2, 6],
    [2, 17],
    [2, 25],
    [2, 30],
    [2, 38],
    [2, 49],
    [2, 58],
    [2, 62],
    [2, 70],
    [2, 77],
    [2, 84],
    [2, 89],
    [2, 94],
    [2, 102],
    [2, 106],
    [2, 113],
    [2, 120],
    [2, 127],
    [2, 135],
    [2, 142],
    [2, 146],
    [2, 154],
    [2, 164],
    [2, 170],
    [2, 177],
    [2, 182],
    [2, 187],
    [2, 191],
    [2, 197],
    [2, 203],
    [2, 211],
    [2, 216],
    [2, 220],
    [2, 225],
    [2, 231],
    [2, 234],
    [2, 238],
    [2, 246],
    [2, 249],
    [2, 253],
    [2, 257],
    [2, 260],
    [2, 265],
    [2, 270],
    [2, 275],
    [2, 282],
    [2, 283],
    [3, 1],
    [3, 10],
    [3, 16],
    [3, 23],
    [3, 30],
    [3, 38],
    [3, 46],
    [3, 53],
    [3, 62],
    [3, 71],
    [3, 78],
    [3, 84],
    [3, 92],
    [3, 101],
    [3, 109],
    [3, 116],
    [3, 122],
    [3, 133],
    [3, 141],
    [3, 149],
    [3, 154],
    [3, 158],
    [3, 166],
    [3, 174],
    [3, 181],
    [3, 187],
    [3, 195],
    [4, 1],
    [4, 7],
    [4, 12],
    [4, 15],
    [4, 20],
    [4, 24],
    [4, 27],
    [4, 34],
    [4, 38],
    [4, 45],
    [4, 52],
    [4, 60],
    [4, 66],
    [4, 75],
    [4, 80],
    [4, 87],
    [4, 92],
    [4, 95],
    [4, 102],
    [4, 106],
    [4, 114],
    [4, 122],
    [4, 128],
    [4, 135],
    [4, 141],
    [4, 148],
    [4, 155],
    [4, 163],
    [4, 171],
    [4, 176],
    [5, 3],
    [5, 6],
    [5, 10],
    [5, 14],
    [5, 18],
    [5, 24],
    [5, 32],
    [5, 37],
    [5, 42],
    [5, 46],
    [5, 51],
    [5, 58],
    [5, 65],
    [5, 71],
    [5, 77],
    [5, 83],
    [5, 90],
    [5, 96],
    [5, 104],
    [5, 109],
    [5, 114],
    [6, 1],
    [6, 9],
    [6, 19],
    [6, 28],
    [6, 36],
    [6, 45],
    [6, 53],
    [6, 60],
    [6, 69],
    [6, 74],
    [6, 82],
    [6, 91],
    [6, 95],
    [6, 102],
    [6, 111],
    [6, 119],
    [6, 125],
    [6, 132],
    [6, 138],
    [6, 143],
    [6, 147],
    [6, 152],
    [6, 158],
    [7, 1],
    [7, 12],
    [7, 23],
    [7, 31],
    [7, 38],
    [7, 44],
    [7, 52],
    [7, 58],
    [7, 68],
    [7, 74],
    [7, 82],
    [7, 88],
    [7, 96],
    [7, 105],
    [7, 121],
    [7, 131],
    [7, 138],
    [7, 144],
    [7, 150],
    [7, 156],
    [7, 160],
    [7, 164],
    [7, 171],
    [7, 179],
    [7, 188],
    [7, 196],
    [8, 1],
    [8, 9],
    [8, 17],
    [8, 26],
    [8, 34],
    [8, 41],
    [8, 46],
    [8, 53],
    [8, 62],
    [8, 70],
    [9, 1],
    [9, 7],
    [9, 14],
    [9, 21],
    [9, 27],
    [9, 32],
    [9, 37],
    [9, 41],
    [9, 48],
    [9, 55],
    [9, 62],
    [9, 69],
    [9, 73],
    [9, 80],
    [9, 87],
    [9, 94],
    [9, 100],
    [9, 107],
    [9, 112],
    [9, 118],
    [9, 123],
    [10, 1],
    [10, 7],
    [10, 15],
    [10, 21],
    [10, 26],
    [10, 34],
    [10, 43],
    [10, 54],
    [10, 62],
    [10, 71],
    [10, 79],
    [10, 89],
    [10, 98],
    [10, 107],
    [11, 6],
    [11, 13],
    [11, 20],
    [11, 29],
    [11, 38],
    [11, 46],
    [11, 54],
    [11, 63],
    [11, 72],
    [11, 82],
    [11, 89],
    [11, 98],
    [11, 109],
    [11, 118],
    [12, 5],
    [12, 15],
    [12, 23],
    [12, 31],
    [12, 38],
    [12, 44],
    [12, 53],
    [12, 64],
    [12, 70],
    [12, 79],
    [12, 87],
    [12, 96],
    [12, 104],
    [13, 1],
    [13, 6],
    [13, 14],
    [13, 19],
    [13, 29],
    [13, 35],
    [13, 43],
    [14, 6],
    [14, 11],
    [14, 19],
    [14, 25],
    [14, 34],
    [14, 43],
    [15, 1],
    [15, 16],
    [15, 32],
    [15, 52],
    [15, 71],
    [15, 91],
    [16, 7],
    [16, 15],
    [16, 27],
    [16, 35],
    [16, 43],
    [16, 55],
    [16, 65],
    [16, 73],
    [16, 80],
    [16, 88],
    [16, 94],
    [16, 103],
    [16, 111],
    [16, 119],
    [17, 1],
    [17, 8],
    [17, 18],
    [17, 28],
    [17, 39],
    [17, 50],
    [17, 59],
    [17, 67],
    [17, 76],
    [17, 87],
    [17, 97],
    [17, 105],
    [18, 5],
    [18, 16],
    [18, 21],
    [18, 28],
    [18, 35],
    [18, 46],
    [18, 54],
    [18, 62],
    [18, 75],
    [18, 84],
    [18, 98],
    [19, 1],
    [19, 12],
    [19, 26],
    [19, 39],
    [19, 52],
    [19, 65],
    [19, 77],
    [19, 96],
    [20, 13],
    [20, 38],
    [20, 52],
    [20, 65],
    [20, 77],
    [20, 88],
    [20, 99],
    [20, 114],
    [20, 126],
    [21, 1],
    [21, 11],
    [21, 25],
    [21, 36],
    [21, 45],
    [21, 58],
    [21, 73],
    [21, 82],
    [21, 91],
    [21, 102],
    [22, 1],
    [22, 6],
    [22, 16],
    [22, 24],
    [22, 31],
    [22, 39],
    [22, 47],
    [22, 56],
    [22, 65],
    [22, 73],
    [23, 1],
    [23, 18],
    [23, 28],
    [23, 43],
    [23, 60],
    [23, 75],
    [23, 90],
    [23, 105],
    [24, 1],
    [24, 11],
    [24, 21],
    [24, 28],
    [24, 32],
    [24, 37],
    [24, 44],
    [24, 54],
    [24, 59],
    [24, 62],
    [25, 3],
    [25, 12],
    [25, 21],
    [25, 33],
    [25, 44],
    [25, 56],
    [25, 68],
    [26, 1],
    [26, 20],
    [26, 40],
    [26, 61],
    [26, 84],
    [26, 112],
    [26, 137],
    [26, 160],
    [26, 184],
    [26, 207],
    [27, 1],
    [27, 14],
    [27, 23],
    [27, 36],
    [27, 45],
    [27, 56],
    [27, 64],
    [27, 77],
    [27, 89],
    [28, 6],
    [28, 14],
    [28, 22],
    [28, 29],
    [28, 36],
    [28, 44],
    [28, 51],
    [28, 60],
    [28, 71],
    [28, 78],
    [28, 85],
    [29, 7],
    [29, 15],
    [29, 24],
    [29, 31],
    [29, 39],
    [29, 46],
    [29, 53],
    [29, 64],
    [30, 6],
    [30, 16],
    [30, 25],
    [30, 33],
    [30, 42],
    [30, 51],
    [31, 1],
    [31, 12],
    [31, 20],
    [31, 29],
    [32, 1],
    [32, 12],
    [32, 21],
    [33, 1],
    [33, 7],
    [33, 16],
    [33, 23],
    [33, 31],
    [33, 36],
    [33, 44],
    [33, 51],
    [33, 55],
    [33, 63],
    [34, 1],
    [34, 8],
    [34, 15],
    [34, 23],
    [34, 32],
    [34, 40],
    [34, 49],
    [35, 4],
    [35, 12],
    [35, 19],
    [35, 31],
    [35, 39],
    [35, 45],
    [36, 13],
    [36, 28],
    [36, 41],
    [36, 55],
    [36, 71],
    [37, 1],
    [37, 25],
    [37, 52],
    [37, 77],
    [37, 103],
    [37, 127],
    [37, 154],
    [38, 1],
    [38, 17],
    [38, 27],
    [38, 43],
    [38, 62],
    [38, 84],
    [39, 6],
    [39, 11],
    [39, 22],
    [39, 32],
    [39, 41],
    [39, 48],
    [39, 57],
    [39, 68],
    [39, 75],
    [40, 8],
    [40, 17],
    [40, 26],
    [40, 34],
    [40, 41],
    [40, 50],
    [40, 59],
    [40, 67],
    [40, 78],
    [41, 1],
    [41, 12],
    [41, 21],
    [41, 30],
    [41, 39],
    [41, 47],
    [42, 1],
    [42, 11],
    [42, 16],
    [42, 23],
    [42, 32],
    [42, 45],
    [42, 52],
    [43, 11],
    [43, 23],
    [43, 34],
    [43, 48],
    [43, 61],
    [43, 74],
    [44, 1],
    [44, 19],
    [44, 40],
    [45, 1],
    [45, 14],
    [45, 23],
    [45, 33],
    [46, 6],
    [46, 15],
    [46, 21],
    [46, 29],
    [47, 1],
    [47, 12],
    [47, 20],
    [47, 30],
    [48, 1],
    [48, 10],
    [48, 16],
    [48, 24],
    [48, 29],
    [49, 5],
    [49, 12],
    [50, 1],
    [50, 16],
    [50, 36],
    [51, 7],
    [51, 31],
    [51, 52],
    [52, 15],
    [52, 32],
    [53, 1],
    [53, 27],
    [53, 45],
    [54, 7],
    [54, 28],
    [54, 50],
    [55, 17],
    [55, 41],
    [55, 68],
    [56, 17],
    [56, 51],
    [56, 77],
    [57, 4],
    [57, 12],
    [57, 19],
    [57, 25],
    [58, 1],
    [58, 7],
    [58, 12],
    [58, 22],
    [59, 4],
    [59, 10],
    [59, 17],
    [60, 1],
    [60, 6],
    [60, 12],
    [61, 6],
    [62, 1],
    [62, 9],
    [63, 5],
    [64, 1],
    [64, 10],
    [65, 1],
    [65, 6],
    [66, 1],
    [66, 8],
    [67, 1],
    [67, 13],
    [67, 27],
    [68, 16],
    [68, 43],
    [69, 9],
    [69, 35],
    [70, 11],
    [70, 40],
    [71, 11],
    [72, 1],
    [72, 14],
    [73, 1],
    [73, 20],
    [74, 18],
    [74, 48],
    [75, 20],
    [76, 6],
    [76, 26],
    [77, 20],
    [78, 1],
    [78, 31],
    [79, 16],
    [80, 1],
    [81, 1],
    [82, 1],
    [83, 7],
    [83, 35],
    [85, 1],
    [86, 1],
    [87, 16],
    [89, 1],
    [89, 24],
    [91, 1],
    [92, 15],
    [95, 1],
    [97, 1],
    [98, 8],
    [100, 10],
    [103, 1],
    [106, 1],
    [109, 1],
    [112, 1],
    [115, 1],
  ],
};

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

function getAyatByPage(pageNumber) {
  const data = loadQuranData();

  // Get the start verse for current page and next page
  const startVerse = QuranData.Page[pageNumber];
  const endVerse = QuranData.Page[pageNumber + 1];

  if (!startVerse) {
    return [];
  }

  return data
    .filter((item) => {
      // If start and end verses are in the same sura
      if (startVerse[0] === (endVerse ? endVerse[0] : startVerse[0])) {
        return (
          item.sura === startVerse[0] &&
          item.aya >= startVerse[1] &&
          (endVerse ? item.aya < endVerse[1] : true)
        );
      }

      // For first sura in the page
      if (item.sura === startVerse[0]) {
        return item.aya >= startVerse[1];
      }

      // For last sura in the page
      if (endVerse && item.sura === endVerse[0]) {
        return item.aya < endVerse[1];
      }

      // For suras in between
      return (
        item.sura > startVerse[0] &&
        (endVerse ? item.sura < endVerse[0] : false)
      );
    })
    .sort((a, b) => {
      if (a.sura === b.sura) {
        return a.aya - b.aya;
      }
      return a.sura - b.sura;
    });
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

// Get verses between a range
async function getVersesRange(startSura, startAya, endSura, endAya) {
  const data = loadQuranData();
  return data
    .filter((item) => {
      // If start and end suras are the same
      if (startSura === endSura) {
        return (
          item.sura === parseInt(startSura) &&
          item.aya >= parseInt(startAya) &&
          (endAya ? item.aya <= parseInt(endAya) : true)
        );
      }

      // For verses in the start sura
      if (item.sura === parseInt(startSura)) {
        return item.aya >= parseInt(startAya);
      }

      // For verses in the end sura
      if (item.sura === parseInt(endSura)) {
        return endAya ? item.aya <= parseInt(endAya) : true;
      }

      // For verses in between suras
      return item.sura > parseInt(startSura) && item.sura < parseInt(endSura);
    })
    .sort((a, b) => {
      if (a.sura === b.sura) {
        return a.aya - b.aya;
      }
      return a.sura - b.sura;
    });
}

// Add this function after loadQuranData()
function getSajdaType(sura, aya) {
  const sajdaVerse = QuranData.Sajda.find(([s, a]) => s === sura && a === aya);
  return sajdaVerse ? sajdaVerse[2] : null;
}

function getPageBySuraAya(suraId, ayaId) {
  const targetSura = parseInt(suraId);
  const targetAya = parseInt(ayaId);

  // Debugging: Check the content of QuranData
  // console.log("QuranData:", QuranData2);

  if (!Array.isArray(QuranData2)) {
    throw new Error("QuranData is not an array");
  }

  // Validate input
  if (targetSura < 1 || targetSura > 114) {
    throw new Error("Invalid sura number. Must be between 1 and 114.");
  }
  // Loop through the pages in QuranData
  for (const page of QuranData2) {
    for (const content of page.content) {
      if (
        content.surah === targetSura ||
        (QuranData2[page.page - 1]?.content[0]?.surah < targetSura &&
          QuranData2[page.page - 1]?.content[1]?.surah > targetSura)
      ) {
        console.log(
          QuranData2[page.page - 1]?.content[0]?.surah,
          "content 0",
          QuranData2[page.page - 1]?.content[1]?.surah,
          "content 1",
          QuranData2[page.page - 1]
        );
        if (
          QuranData2[page.page - 1]?.content[0]?.surah < targetSura &&
          QuranData2[page.page - 1]?.content[1]?.surah > targetSura
        ) {
          return page.page;
        }
        if (content.fromVerse <= targetAya && targetAya <= content.toVerse) {
          return page.page;
        }
        return page.page;
      }
    }
  }
  return "page not found";

  throw new Error("Verse not found");
}
module.exports = {
  getAyatBySura,
  getAyaBySuraAndNumber,
  searchAyat,
  getAyatRange,
  getVersesRange,
  getAyatByPage,
  getPageBySuraAya,
  QuranData,
};
