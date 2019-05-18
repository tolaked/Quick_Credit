import express from "express";
import bodyParser from "body-parser";
import users from "./routes/api/users";
import loans from "./routes/api/loans";
import admin from "./routes/api/admin";
import usersV2 from "./routes/v2api/usersV2";
import loansv2 from "./routes/v2api/loansV2";
import adminV2 from "./routes/v2api/v2admin";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Initialize express app
const app = express();

const swaggerDocument = YAML.load(`${__dirname}/../swagger.yaml`);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Home page route
app.get("/", (req, res) =>
  res.status(200).json({
    status: 200,
    data: [
      {
        message: "Welcome to QUICK CREDIT"
      }
    ]
  })
);

app.use("/api/v1/auth", users);
app.use("/api/v1", loans);
app.use("/api/v1", admin);
app.use("/api/v2/auth", usersV2);
app.use("/api/v2", loansv2);
app.use("/api/v2", adminV2);

// // Hnadles
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      status: 500,
      error: "internal server error"
    });
  }
  return next();
});
// Handle non existing route with with proper message
app.all("*", (req, res) =>
  res.status(404).json({
    status: 404,
    error: "Route does not exist"
  })
);

// Define application port number
const port = process.env.PORT || 8000;

// Start server
app.listen(port);

// expose app to be use in another file
export default app;
