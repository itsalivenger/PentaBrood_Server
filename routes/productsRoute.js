let router = require("express").Router();

router.post("/", async (req, res) => {
  console.log("got request in the /products to add a product");
  let product = req.body;
  
  let collection = req.db.collection("Products");

  // check if the product already exists
  let exists = await collection.findOne({ prodName: product.prodName });
  if (exists) {
    res.send({ txt: "product already exists" });
  } else {
    collection.insertOne(product, (err, result) => {
      if (err){
        res.send({ txt: "failed to add product" });
      } else {
        res.send({ txt: "added product successfully", res: req.body });
      }
    });
  }
  exists = {};
});

router.put("/", async (req, res) => {
  let { newProduct, oldProduct } = req.body;
  console.log("got request in /products with a Put request");
  let collection = req.db.collection("Products");
  let result = await collection.findOneAndUpdate(
    { prodName: oldProduct.prodName },
    { $set: newProduct }
  );
  // console.log(result);
  res.send({ txt: "updated product successfully", res: req.body });
});

router.delete("/", async (req, res) => {
  let prod = req.body;
  console.log("got a delete request");
  let collection = req.db.collection("Products");
  let result = await collection.findOneAndDelete({ prodName: prod.prodName });
  console.log(result);
  res.send({ txt: "was sent successfully", result });
});

router.get("/", async (req, res) => {
  const collection = req.db.collection("Products");
  console.log('got a get request to /products to get all products');
  let arr = await collection
    .find()
    .toArray();
    console.log(arr);
  res.send(arr);
})

router.get("/:filter", async (req, res) => {
    console.log("got a get request to /products to get all products");
    let { searchVal, maxVal, minVal, types = [] } = JSON.parse(req.params.filter);
    let query = {};
  
  
    if(searchVal){
      query.prodName = new RegExp(searchVal, "i")
    }
    if(maxVal){
      query.prodPrice = {
        $lte: parseInt(maxVal)
      }
    }
    if(minVal){
      query.prodPrice = {
        ...query.prodPrice,
        $gte: parseInt(minVal)
      }
    }
    if(types.length){
      query.prodType = {
        $in: types
      }
    }
    console.log(query);
    let collection = req.db.collection("Products");
    let arr = await collection
      .find(query)
      .toArray();
    console.log(arr);
    res.send(arr);
  });

module.exports = router;