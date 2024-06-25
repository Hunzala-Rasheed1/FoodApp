const mongoose = require('mongoose');

const mongodbConnection = "mongodb+srv://foodfusion:faham123456789@cluster0.cn50aph.mongodb.net/foodfusion?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongodbConnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        const foodItemCollection = mongoose.connection.db.collection("food_item");
        const foodData = await foodItemCollection.find({}).toArray();

        const categoryCollection = mongoose.connection.db.collection("food_Catego0ry");
        const categoryData = await categoryCollection.find({}).toArray();

        global.food_item = foodData;
        global.Catagery_Data = categoryData;

        console.log("Data fetched and stored in global variables");
    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err);
    }
};

module.exports = mongoDB;
