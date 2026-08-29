const express = require("express");
const router = express.Router();

const productController = require("../controller/product.js");

router.get("/", productController.getHome);

router.get("/contact", productController.getContact);

router.post("/contact",productController.postContact);

router.get("/faq",productController.getFaq);

router.get("/store", productController.getStore);

router.get("/productDetails",productController.getProductDetails);

router.get("/sale",productController.getSale);

router.get("/cart",productController.getCart);

router.post("/cart/:id", productController.addToCart);

router.get("/checkout", productController.getCheckout);

router.post("/order", productController.placeOrder);

router.get("/products/:id",productController.getProductById);


module.exports = router;