const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const initData = require("./data");
const Product = require("../models/product");

const dbUrl = process.env.MONGODB_URL;

async function main() {
    await mongoose.connect(dbUrl);

    console.log("DB Connected");

    await Product.deleteMany({});
    await Product.insertMany(initData.data);

    console.log("Data was initialized");

    await mongoose.connection.close();

    console.log("DB Connection Closed");
}

main().catch(err => {
    console.log("Initialization Error:", err);
});