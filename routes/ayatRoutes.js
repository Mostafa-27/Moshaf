const express = require("express");
const router = express.Router();
const {
  getAyatBySura,
  getAyaBySuraAndNumber,
  searchAyat,
  getAyatRange,
  getVersesRange,
  getSpecificVerse,
  QuranData,
  getAyatByPage,
  getPageBySuraAya,
} = require("../utils/quranData");

// Get all Ayat of a specific Sura
router.get("/sura/:suraId", async (req, res) => {
  try {
    const ayat = getAyatBySura(req.params.suraId);

    if (ayat.length === 0) {
      return res.status(404).json({ error: "No ayat found for this sura" });
    }

    res.json(ayat);
  } catch (error) {
    console.error("Error fetching ayat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific Aya by Sura and Aya number
router.get("/sura/:suraId/aya/:ayaNumber", async (req, res) => {
  try {
    const aya = getAyaBySuraAndNumber(req.params.suraId, req.params.ayaNumber);

    if (!aya) {
      return res.status(404).json({ error: "Aya not found" });
    }

    res.json(aya);
  } catch (error) {
    console.error("Error fetching aya:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search Ayat by text
router.get("/search/:query", async (req, res) => {
  try {
    const ayat = searchAyat(req.params.query);
    res.json(ayat);
  } catch (error) {
    console.error("Error searching ayat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a range of Ayat (for continuous reading)
router.get("/range", async (req, res) => {
  try {
    const { startSura, startAya, endSura, endAya } = req.query;

    if (!startSura || !startAya || !endSura || !endAya) {
      return res.status(400).json({
        error:
          "Missing required query parameters: startSura, startAya, endSura, endAya",
      });
    }

    const ayat = getAyatRange(startSura, startAya, endSura, endAya);

    if (ayat.length === 0) {
      return res.status(404).json({ error: "No ayat found in this range" });
    }

    res.json(ayat);
  } catch (error) {
    console.error("Error fetching ayat range:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get verses for a specific page of the Quran
router.get("/page/:pageNumber", async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.pageNumber);

    if (pageNumber < 1 || pageNumber > 604) {
      return res
        .status(400)
        .json({ error: "Invalid page number. Must be between 1 and 604." });
    }

    // Debugging log to check QuranData.Page
    // console.log("QuranData.Page:", QuranData.Page);

    if (!QuranData) {
      console.error("QuranData.Page is undefined");
      return res
        .status(500)
        .json({ error: "Quran page data is not available" });
    }

    const verses = getAyatByPage(pageNumber);

    if (verses.length === 0) {
      return res.status(404).json({ error: "Page not found" });
    }

    const startVerse = QuranData.Page[pageNumber];
    const endVerse = QuranData.Page[pageNumber + 1];

    if (!startVerse) {
      console.error(`Start verse not found for page ${pageNumber}`);
      return res
        .status(404)
        .json({ error: "Start verse not found for this page" });
    }

    res.json({
      page: pageNumber,
      startVerse: {
        sura: startVerse[0],
        aya: startVerse[1],
      },
      endVerse: endVerse
        ? {
            sura: endVerse[0],
            aya: endVerse[1] - 1,
          }
        : null,
      verses,
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all sajda verses in the Quran
router.get("/sajda", async (req, res) => {
  try {
    const sajdaVerses = await Promise.all(
      QuranData.Sajda.slice(1).map(async ([sura, aya, type]) => {
        const verse = await getSpecificVerse(sura, aya);
        return {
          sura,
          aya,
          type,
          verse,
        };
      })
    );

    res.json(sajdaVerses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get page number for a specific sura and aya
router.get("/getpage/:suraId/aya/:ayaNumber", async (req, res) => {
  try {
    const suraId = parseInt(req.params.suraId);
    const ayaNumber = parseInt(req.params.ayaNumber);

    // Input validation
    if (isNaN(suraId) || isNaN(ayaNumber)) {
      return res.status(400).json({
        error: "Sura ID and Aya number must be valid numbers",
      });
    }

    const pageNumber = getPageBySuraAya(suraId, ayaNumber);

    res.json({
      sura: suraId,
      aya: ayaNumber,
      page: pageNumber,
    });
    console.log(pageNumber);
  } catch (error) {
    if (
      error.message.includes("Invalid sura number") ||
      error.message.includes("Verse not found")
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
