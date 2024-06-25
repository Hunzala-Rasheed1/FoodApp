const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDb = require("./db");
mongoDb();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions)); // Use CORS middleware with specific options

app.use(express.json());
app.use('/api', require("./Router/CreateUser"));
app.use('/api', require("./Router/DisplayData"));
app.use('/api', require("./Router/orderData")); // Ensure this router is correctly required

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
