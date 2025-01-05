const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static Swagger files
app.use("/docs", express.static("public/swagger"));

// Swagger documentation
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Moshaf API",
    version: "1.0.0",
    description: "A simple API to access Quran verses from a text file",
    contact: {
      name: "API Support",
      email: "support@moshafapi.com",
    },
  },
  servers: [
    {
      url:
        process.env.NODE_ENV === "production"
          ? "https://moshaf-woad.vercel.app"
          : `http://localhost:${port}`,
      description:
        process.env.NODE_ENV === "production"
          ? "Production server"
          : "Development server",
    },
  ],
  paths: {
    "/api/ayat/sura/{suraId}": {
      get: {
        summary: "Get all verses of a specific sura",
        parameters: [
          {
            name: "suraId",
            in: "path",
            required: true,
            description: "The sura number (1-114)",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 114,
            },
          },
        ],
        responses: {
          200: {
            description: "List of verses in the sura",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      index: { type: "integer" },
                      sura: { type: "integer" },
                      aya: { type: "integer" },
                      text: { type: "string" },
                    },
                  },
                },
              },
            },
          },
          404: { description: "Sura not found" },
        },
      },
    },
    // ... other paths remain the same ...
  },
};

// Swagger UI setup
app.use("/docs", swaggerUi.serve);
app.get(
  "/docs",
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
    customCssUrl: "/docs/swagger-ui.css",
    customJs: [
      "/docs/swagger-ui-bundle.js",
      "/docs/swagger-ui-standalone-preset.js",
    ],
    customSiteTitle: "Moshaf API Documentation",
    explorer: true,
  })
);

// Root redirect
app.get("/", (req, res) => {
  res.redirect("/docs");
});

// API Routes
app.use("/api/ayat", require("./routes/ayatRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Development server
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`.bgMagenta.white);
  });
}

// Export for serverless
module.exports = app;
module.exports.handler = serverless(app);
