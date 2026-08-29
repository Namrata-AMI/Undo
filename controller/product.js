const Product = require("../models/product.js");


// HOME
exports.getHome = async (req, res) => {
    res.render("lists/index");
};


// CONTACT
exports.getContact = (req, res) => {
    res.render("lists/contact");
};


exports.postContact = async (req, res) => {

    const { name, email, message } = req.body;

    console.log("Name", name);
    console.log("email", email);
    console.log("message", message);

    res.send("message received successfully");
};


// FAQ
exports.getFaq = (req, res) => {
    res.render("lists/faq");
};


// STORE
exports.getStore = async (req, res) => {

    const products = await Product.find({});

    res.render("lists/store", {
        products
    });

};


// SALE
exports.getSale = async (req, res) => {

    const products = await Product.find({
        sale: true
    });

    res.render("lists/sale", {
        products
    });

};


// PRODUCT DETAILS PAGE
exports.getProductDetails = (req, res) => {

    res.render("lists/productdetails");

};


// =========================
// CART
// =========================


// SHOW CART
exports.getCart = (req, res) => {

    const cart = req.session.cart || [];

    let total = 0;

    cart.forEach(item => {

        total += item.product.price * item.quantity;

    });

    res.render("lists/cart", {
        cart,
        total
    });

};


// ADD TO BAG
exports.addToCart = async (req, res) => {

    try {

        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send("Product not found");
        }


        // Create cart if it doesn't exist
        if (!req.session.cart) {
            req.session.cart = [];
        }


        // Check if product already exists
        const existingItem = req.session.cart.find(item => {

            return item.product._id.toString() === id;

        });


        // If product already exists
        if (existingItem) {

            existingItem.quantity += 1;

        }

        // If product is new
        else {

            req.session.cart.push({
                product: product,
                quantity: 1
            });

        }


        // Save session
        req.session.save(() => {

            res.redirect("/app/cart");

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Something went wrong");

    }

};


// INCREASE QUANTITY
exports.increaseCart = (req, res) => {

    const { id } = req.params;


    if (!req.session.cart) {

        return res.redirect("/app/cart");

    }


    const item = req.session.cart.find(item => {

        return item.product._id.toString() === id;

    });


    if (item) {

        item.quantity += 1;

    }


    req.session.save(() => {

        res.redirect("/app/cart");

    });

};


// DECREASE QUANTITY
exports.decreaseCart = (req, res) => {

    const { id } = req.params;


    if (!req.session.cart) {

        return res.redirect("/app/cart");

    }


    const item = req.session.cart.find(item => {

        return item.product._id.toString() === id;

    });


    if (!item) {

        return res.redirect("/app/cart");

    }


    // Decrease quantity
    if (item.quantity > 1) {

        item.quantity -= 1;

    }


    // Remove product when quantity reaches 1
    else {

        req.session.cart = req.session.cart.filter(item => {

            return item.product._id.toString() !== id;

        });

    }


    req.session.save(() => {

        res.redirect("/app/cart");

    });

};


// =========================
// CHECKOUT
// =========================


exports.getCheckout = (req, res) => {

    const cart = req.session.cart || [];


    if (cart.length === 0) {

        return res.redirect("/app/cart");

    }


    let total = 0;


    cart.forEach(item => {

        total += item.product.price * item.quantity;

    });


    res.render("lists/checkout", {

        cart,
        total

    });

};


// =========================
// PLACE ORDER
// =========================


exports.placeOrder = (req, res) => {

    const cart = req.session.cart || [];


    if (cart.length === 0) {

        return res.redirect("/app/cart");

    }


    console.log("Order:", req.body);

    console.log("Products:", cart);


    // Empty cart after order
    req.session.cart = [];


    req.session.save(() => {

        res.render("lists/order", {

            name: req.body.name

        });

    });

};


// =========================
// PRODUCT BY ID
// =========================


exports.getProductById = async (req, res) => {

    try {

        const { id } = req.params;


        const product = await Product.findById(id);


        if (!product) {

            return res.status(404).send("Product not found");

        }


        res.render("lists/product", {

            product

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Something went wrong");

    }

};