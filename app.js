// server.js
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3301;

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Moshaf API",
    version: "1.0.0",
    description: "A simple API to access Quran verses from a text file",
    endpoints: {
      "GET /api/ayat/sura/:suraId": {
        description: "Get all verses of a specific sura",
        params: {
          suraId: "The sura number (1-114)",
        },
      },
      "GET /api/ayat/sura/:suraId/aya/:ayaNumber": {
        description: "Get a specific verse",
        params: {
          suraId: "The sura number (1-114)",
          ayaNumber: "The verse number within the sura",
        },
      },
      "GET /api/ayat/search/:query": {
        description: "Search verses by text",
        params: {
          query: "Text to search for in verses",
        },
      },
      "GET /api/ayat/range": {
        description: "Get a range of verses for continuous reading",
        query: {
          startSura: "Starting sura number",
          startAya: "Starting verse number",
          endSura: "Ending sura number",
          endAya: "Ending verse number",
        },
      },
    },
  });
});

app.use("/api/ayat", require("./routes/ayatRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`.bgMagenta.white);
});
