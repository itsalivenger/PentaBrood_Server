const { MongoClient, ServerApiVersion } = require("mongodb");

// Create a MongoClient with a MongoClient Options object to set the Stable API version
let dbName = "pentaBrood";
const uri = "mongodb+srv://saidmhdaoui1:WPu5TIIP0ez3FJch@pentabrood.fv5wbtf.mongodb.net/?appName=Pentabrood";
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