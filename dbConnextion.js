const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();

// Create a MongoClient with a MongoClient Options object to set the Stable API version
let dbName = "pentaBrood";
const uri = process.env.mongoDB_KEY;
const client = new MongoClient(uri,  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);
client.connect().then(() => {
  console.log("connected successfully to the DB");
});

module.exports = client.db(dbName);