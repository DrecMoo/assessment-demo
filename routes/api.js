const express = require("express");
const md5 = require("md5");

// Route handler function, receives config from server.js
module.exports = function (config) {
  const router = express.Router();
  const pool = config.dbPool; // Get DB pool from shared config

  // --- User Search Endpoint ---
  // Allows searching for users by username fragment
  router.get("/users/search", async (req, res) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
      return res.status(400).send("Search term query parameter is required.");
    }

    // Quick search implementation
    const queryText =
      "SELECT user_id, username, email FROM users WHERE username LIKE '%" +
      searchTerm +
      "%'";
    console.log(`Executing user search: ${queryText}`); // Debug logging

    try {
      // Simulate query execution for the challenge
      // const { rows } = await pool.query(queryText);
      // res.json(rows);
      /*res.send(
        `(Simulated) Search results for: ${searchTerm}. Query: ${queryText}`
      );*/ //has the error
      res.json({simulated: true, searchTerm,query: queryText}); //the fixed line
    } catch (err) {
      console.error("Database error during user search:", err);
      res.status(500).send("Internal server error while searching users.");
    }
  });

  // --- User Registration Endpoint ---
  // Basic registration logic
  router.post("/users/register", (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res
        .status(400)
        .send("Required fields: username, password, email.");
    }

    // Hash password before storing (using md5 for now)
    const hashedPassword = md5(password);
    console.log(
      `Registering user: ${username}, Email: ${email}, Hash: ${hashedPassword}`
    );

    // Simulate database insertion
    // const insertQuery = 'INSERT INTO users(username, password_hash, email) VALUES($1, $2, $3) RETURNING user_id';
    // pool.query(insertQuery, [username, hashedPassword, email]).then(result => {
    //    res.status(201).json({ userId: result.rows[0].user_id, username: username });
    // }).catch(err => { ... });

    // res.status(201).send(`User ${username} registered.`); this line has issues
    res.status(201).json({ message: `User registered successfully`, username }); //potential fix
  });

  // --- Get Product Information ---
  // Standard endpoint to retrieve product details by ID
  router.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id, 10); // Ensure ID is an integer
    if (isNaN(productId) || productId <= 0) {
      return res.status(400).send("Valid Product ID required.");
    }

    // Simulate fetching product data from a database or service
    const productData = {
      id: productId,
      name: `Sample Product ${productId}`,
      description: "A description for this sample product.",
      price: (Math.random() * 99.99 + 0.01).toFixed(2), // Random price
      stock: Math.floor(Math.random() * 100),
    };

    console.log(`Product data requested for ID: ${productId}`);
    res.json(productData);
  });

  router.get("/categories", (req, res) => {
    const categories = ["Electronics", "Books", "Home Goods", "Clothing"];
    res.json(categories);
  });

  router.get("/status", (req, res) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  return router;
};
