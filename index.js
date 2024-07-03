const express = require("express");
const cors = require("cors");
const db = require("./dbConnextion");
const prodsRouter = require("./routes/productsRoute");
const app = express();
const PORT = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins = ["https://itsalivenger.github.io/*", "http://127.0.0.1:5500", "https://itsalivenger.github.io/PentaBrood"];

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Handle preflight OPTIONS requests
app.options('*', cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Middleware to include db
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Middleware to add CORS headers manually
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // Set specific origin
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Products Express Router
app.use("/products", prodsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} for requests`);
});
