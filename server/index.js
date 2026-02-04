const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// CORS configuration from environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:3000', 'http://localhost:3001'];

const allowedMethods = process.env.ALLOWED_METHODS
  ? process.env.ALLOWED_METHODS.split(',').map(method => method.trim())
  : ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

if (process.env.NODE_ENV !== 'production') {
  console.log('CORS Configuration:');
  console.log('  Allowed Origins:', allowedOrigins);
  console.log('  Allowed Methods:', allowedMethods);
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: allowedMethods,
  }),
);

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const routes = require("./routes");
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ 
    status: "ok",
    message: "Backend is working",
    timestamp: new Date().toISOString()
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for Vercel serverless
module.exports = app;