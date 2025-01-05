const express = require("express");
const router = express.Router();
const {
  getAyatBySura,
  getAyaBySuraAndNumber,
  searchAyat,
  getAyatRange,
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

module.exports = router;
