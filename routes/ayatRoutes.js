const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// Get all Ayat of a specific Sura
router.get("/sura/:suraId", async (req, res) => {
  try {
    const [ayat] = await pool.execute(
      "SELECT * FROM quran_text WHERE sura = ? ORDER BY aya",
      [req.params.suraId]
    );

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
    const [aya] = await pool.execute(
      "SELECT * FROM quran_text WHERE sura = ? AND aya = ?",
      [req.params.suraId, req.params.ayaNumber]
    );

    if (aya.length === 0) {
      return res.status(404).json({ error: "Aya not found" });
    }

    res.json(aya[0]);
  } catch (error) {
    console.error("Error fetching aya:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search Ayat by text
router.get("/search/:query", async (req, res) => {
  try {
    const [ayat] = await pool.execute(
      "SELECT * FROM quran_text WHERE text LIKE ?",
      [`%${req.params.query}%`]
    );
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

    const [ayat] = await pool.execute(
      `SELECT * FROM quran_text 
       WHERE (sura > ? OR (sura = ? AND aya >= ?))
       AND (sura < ? OR (sura = ? AND aya <= ?))
       ORDER BY sura, aya`,
      [startSura, startSura, startAya, endSura, endSura, endAya]
    );

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
