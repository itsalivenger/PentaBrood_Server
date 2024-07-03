const express = require("express");
const cors = require("cors");
const db = require("./dbConnextion");
const prodsRouter = require("./routes/productsRoute");
const app = express();
const PORT = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins = ["https://itsalivenger.github.io", "http://127.0.0.1:5500"];

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
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

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Products Express Router
app.use("/products", prodsRouter);
app.get('/', (req, res) => {
    res.send({txt: "hello world"});
})

// Handle preflight OPTIONS requests
app.options('*', cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} for requests`);
});
