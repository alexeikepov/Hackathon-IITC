import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yamljs";

// ✅ simulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ load swagger.yaml correctly (assuming it's at /server/swagger.yaml)
const swaggerPath = path.resolve(__dirname, "./swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};