const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes.
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

// Instantiate the express app.
const app = express();

// Connect to MongoDB.
const connString = process.env.DB_CONN;
mongoose
  .connect(connString)
  .then(() => {
    console.log(`Connected to the database: ${connString}`);
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware.
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes.
app.use("/api", postRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
