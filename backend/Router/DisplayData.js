const express = require('express');
const router = express.Router();

// Define your routes here
router.post('/DisplayData', (req, res) => {
  try {
    const responseData = {
      foodItem: global.food_item,
      categoryData: global.Catagery_Data
    };
    res.send(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
