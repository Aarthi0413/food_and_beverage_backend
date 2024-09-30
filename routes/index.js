const express = require('express');
const router = express.Router();

const userSignup = require('../controller/userSignup');
const userLogin = require('../controller/userLogin');
const userDetails = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');
const allUsers = require('../controller/allUsers');
const updateUser = require('../controller/updateUser');
const uploadProduct = require('../controller/uploadProduct');
const getProduct = require('../controller/getProduct');
const updateProducts = require('../controller/updateProducts');
const getCategoryProduct = require('../controller/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/getCategoryWisePeoduct');
const getProductDetails = require('../controller/getProductDetails');
const addToCart = require('../controller/addToCart');
const countAddToCartProduct = require('../controller/countAddToCartProduct');
const addToCartViewProduct = require('../controller/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/deleteAddToCartProduct');
const searchProduct = require('../controller/searchProduct');
const filterProduct = require('../controller/filterProduct');
const payment = require('../controller/paymant');
const webhook = require('../controller/webhook');
const order = require('../controller/order');
const allOrder = require('../controller/allOrder');
const deleteProduct = require('../controller/deleteProduct');

router.post('/signup', userSignup)
router.post('/login', userLogin);
router.get('/user-details',authToken, userDetails);
router.get('/logout', userLogout);

//admin panel
router.get('/all-user',authToken,allUsers);
router.post('/update-user',authToken,updateUser);

//product
router.post('/upload-product', authToken, uploadProduct);
router.get('/get-product', getProduct);
router.post('/update-product', authToken, updateProducts);
router.post('/delete-product', authToken, deleteProduct);
router.get('/get-category-product', getCategoryProduct);
router.post('/category-product', getCategoryWiseProduct);
router.post('/product-details', getProductDetails);
router.get('/search', searchProduct);
router.post('/filter-product',filterProduct);

//User add to cart
router.post('/addtocart', authToken,addToCart);
router.get('/countAddToCartProduct', authToken,countAddToCartProduct);
router.get('/view-cart-product', authToken,addToCartViewProduct);
router.post('/update-cart-product', authToken,updateAddToCartProduct);
router.post('/delete-cart-product', authToken, deleteAddToCartProduct);

//payment and order
router.post('/checkout', authToken,payment)
router.post('/webhook', webhook);
router.get('/order-list', authToken,order);
router.get('/all-order', authToken,allOrder)

module.exports = router;