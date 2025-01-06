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
          404: {
            description: "Sura not found",
          },
        },
      },
    },
    "/api/ayat/sura/{suraId}/aya/{ayaNumber}": {
      get: {
        summary: "Get a specific verse",
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
          {
            name: "ayaNumber",
            in: "path",
            required: true,
            description: "The verse number within the sura",
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "The requested verse",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    index: { type: "integer" },
                    sura: { type: "integer" },
                    aya: { type: "integer" },
                    text: { type: "string" },
                    sajda: {
                      type: "string",
                      enum: ["obligatory", "recommended", null],
                      description: "Type of sajda if present, null otherwise",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Verse not found",
          },
        },
      },
    },
    "/api/ayat/search/{query}": {
      get: {
        summary: "Search verses by text",
        parameters: [
          {
            name: "query",
            in: "path",
            required: true,
            description: "Text to search for in verses",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "List of matching verses",
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
          404: {
            description: "No verses found matching the search query",
          },
        },
      },
    },
    "/api/ayat/range": {
      get: {
        summary: "Get a range of verses for continuous reading",
        parameters: [
          {
            name: "startSura",
            in: "query",
            required: true,
            description: "Starting sura number (1-114)",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 114,
            },
          },
          {
            name: "startAya",
            in: "query",
            required: true,
            description: "Starting verse number",
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
          {
            name: "endSura",
            in: "query",
            required: true,
            description: "Ending sura number (1-114)",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 114,
            },
          },
          {
            name: "endAya",
            in: "query",
            required: true,
            description: "Ending verse number",
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "List of verses in the specified range",
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
          400: {
            description: "Invalid range parameters",
          },
          404: {
            description: "No verses found in the specified range",
          },
        },
      },
    },
    "/api/ayat/page/{pageNumber}": {
      get: {
        summary: "Get verses for a specific page of the Quran",
        parameters: [
          {
            name: "pageNumber",
            in: "path",
            required: true,
            description: "The page number (1-604)",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 604,
            },
          },
        ],
        responses: {
          200: {
            description: "List of verses on the specified page",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    page: { type: "integer" },
                    startVerse: {
                      type: "object",
                      properties: {
                        sura: { type: "integer" },
                        aya: { type: "integer" },
                      },
                    },
                    endVerse: {
                      type: "object",
                      properties: {
                        sura: { type: "integer" },
                        aya: { type: "integer" },
                      },
                    },
                    verses: {
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
            },
          },
          400: {
            description: "Invalid page number",
          },
          404: {
            description: "Page not found",
          },
        },
      },
    },
    "/api/ayat/sajda": {
      get: {
        summary: "Get all sajda verses in the Quran",
        responses: {
          200: {
            description: "List of sajda verses",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      sura: { type: "integer" },
                      aya: { type: "integer" },
                      type: {
                        type: "string",
                        enum: ["obligatory", "recommended"],
                      },
                      verse: {
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
            },
          },
        },
      },
    },
    "/api/ayat/getpage/{suraId}/aya/{ayaNumber}": {
      get: {
        summary: "Get page number for a specific verse",
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
          {
            name: "ayaNumber",
            in: "path",
            required: true,
            description: "The verse number within the sura",
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "Page number containing the requested verse",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    sura: {
                      type: "integer",
                      description: "The sura number",
                    },
                    aya: {
                      type: "integer",
                      description: "The verse number",
                    },
                    page: {
                      type: "integer",
                      description: "The page number where the verse is located",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid sura or aya number, or verse not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
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
