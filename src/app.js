import express from "express";
import logger from "morgan";
import createError from "http-errors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import connectDB from "database/connection";
import { tokenRoutes, moneyRoutes, statsRoutes } from "routes";
import { errorHandler } from "middlewares";
import { convertTokenToUSD } from "jobs";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dreamland API Docs",
      version: "1.0.0",
      customSiteTitle: "New Title",
    },
  },
  apis: ["./src/routes/[a-z]*.js"],
};

const swaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Dreamland API Docs",
};

const swaggerSpec = swaggerJsdoc(options);

const app = express();

connectDB();
convertTokenToUSD();

app.use(logger("dev"));
app.use(express.json());

tokenRoutes(app);
moneyRoutes(app);
statsRoutes(app);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(errorHandler);

export default app;
