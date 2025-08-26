import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import createError from "http-errors";
import helmet from "helmet";
import xssClean from "xss-clean";
import mainRouter from "././src/routes/index.js";

dotenv.config();
const port = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
// pastikan dipanggil sebagai function
app.use(xssClean());

// Routes
app.use("/", mainRouter);
app.use("/img", express.static("upload"));

// Handle 404
app.all("*", (req, res, next) => {
  next(new createError.NotFound("Route not found"));
});

// Error handling middleware (harus 4 parameter)
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const messageError = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: messageError,
  });
});

// Server listen
app.listen(port, () => {
  console.log(`⚡ Server running at http://localhost:${port}`);
});
