const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load .env
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Route middlewares
app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);

// DB connection and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.error("❌ DB connection error:", err));
