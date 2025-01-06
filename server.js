const express = require("express");
const { getPageBySuraAya } = require("./utils/quranData");
const app = express();

app.get("/api/ayat/getpage/:suraId/aya/:ayaId", (req, res) => {
  const { suraId, ayaId } = req.params;

  try {
    const page = getPageBySuraAya(suraId, ayaId);
    res.status(200).json({ page });
  } catch (error) {
    console.error("Error fetching page:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
