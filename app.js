require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");  
const appRouter = require("./router/product.js");
const dbUrl = process.env.MONGODB_URL;
const secret = process.env.SECRET;
const session = require("express-session");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));


app.use(session({
    secret:secret,
    resave: false,
    saveUninitialized: true
}));


app.get("/", (req, res) => {
    res.render("lists/index");
});


app.use("/app",appRouter);



main()
    .then(() => {
        console.log("working db");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
    });

async function main() {
    await mongoose.connect(dbUrl);
}



app.listen(8080,()=>{
    console.log("server is running at port 8080");
})
