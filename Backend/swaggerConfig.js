// swaggerConfig.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "CRW-Backend",
      version: "1.0.0", 
      description: "API documentation for my awesome project",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;
