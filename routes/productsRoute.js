let router = require("express").Router();
let ObjectId = require("mongodb").ObjectId;

// Add Product
router.post("/", async (req, res) => {
  try {
    console.log("Received POST request to add a product");
    let product = req.body;
    let collection = req.db.collection("Products");

    // Check if the product already exists
    let exists = await collection.findOne({ name: product.name });
    if (exists) {
      res.status(409).send({ txt: "Product already exists" });
    } else {
      await collection.insertOne(product);
      res.status(201).send({ txt: "Product added successfully", product });
    }
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({ txt: "Failed to add product", error });
  }
});

// Update Product
router.put("/", async (req, res) => {
  try {
    let { newProduct, oldProduct } = req.body;
    console.log("Received PUT request to update a product");
    let collection = req.db.collection("Products");

    let result = await collection.findOneAndUpdate(
      { prodName: oldProduct.prodName },
      { $set: newProduct }
    );

    if (result.value) {
      res.status(200).send({ txt: "Product updated successfully", newProduct });
    } else {
      res.status(404).send({ txt: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ txt: "Failed to update product" });
  }
});

// Delete Product
router.delete("/", async (req, res) => {
  try {
    let prod = req.body;
    console.log("Received DELETE request to delete a product");
    let collection = req.db.collection("Products");

    let result = await collection.findOneAndDelete({ prodName: prod.prodName });

    if (result.value) {
      res.status(200).send({ txt: "Product deleted successfully", result });
    } else {
      res.status(404).send({ txt: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ txt: "Failed to delete product" });
  }
});

// Get All Products
router.get("/shop", async (req, res) => {
  console.log('khooya finha l GET request');
  try {
    console.log("Received GET request to fetch all products");
    let collection = req.db.collection("Products");

    let products = await collection.find().toArray();
    res.status(200).send({txt: "Products fetched successfully", products});
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ txt: "Failed to fetch products"});
  }
});

router.get("/popularAndRated", async (req, res) => {
  console.log("Received GET request to fetch popular and rated products");
  let collection = req.db.collection("Products");
  let products = await collection
    .find()
    .limit(12)
    .toArray();
  res.status(200).send({ txt: "Products fetched successfully", products: {popular: products, rated: products} });
});

router.get("/", async (req, res) => {
  let _id = new ObjectId(req.query.id);
  let collection = req.db.collection("Products");
  let prod = await collection.findOne({ _id });
  res.send(prod);
});

// Get Filtered Products
router.get("/:filter", async (req, res) => {
  try {
    console.log("Received GET request to fetch filtered products");
    let { searchVal, maxVal, minVal, types = [] } = JSON.parse(req.params.filter);
    let query = {};

    if (searchVal) {
      query.prodName = new RegExp(searchVal, "i");
    }
    if (maxVal) {
      query.prodPrice = { $lte: parseInt(maxVal) };
    }
    if (minVal) {
      query.prodPrice = { ...query.prodPrice, $gte: parseInt(minVal) };
    }
    if (types.length) {
      query.prodType = { $in: types };
    }

    console.log(query);
    let collection = req.db.collection("Products");
    let products = await collection.find(query).toArray();
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).send({ txt: "Failed to fetch products" });
  }
});

module.exports = router;
