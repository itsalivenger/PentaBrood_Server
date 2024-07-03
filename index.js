const express = require("express");
const cors = require("cors");
const db = require("./dbConnextion");
const prodsRouter = require("./routes/productsRoute");
const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: "https://itsalivenger.github.io",
  credentials: true,
}));

// Correcting middleware definition to include req, res, and next
app.use((req, res, next) => {
  req.db = db;
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
