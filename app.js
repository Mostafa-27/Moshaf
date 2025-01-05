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
    endpoints: {
      "GET /api/ayat/sura/:suraId": "Get all verses of a specific sura",
      "GET /api/ayat/sura/:suraId/aya/:ayaNumber": "Get a specific verse",
      "GET /api/ayat/search/:query": "Search verses by text",
      "GET /api/ayat/range":
        "Get a range of verses (params: startSura, startAya, endSura, endAya)",
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
