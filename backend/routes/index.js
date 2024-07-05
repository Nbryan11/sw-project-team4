const express = require('express')

const router = express.Router()

const userSignUp = require("../controller/user/userSignUp")
const userSignIn = require("../controller/user/userSignIn")
const userDetailsController = require("../controller/user/userDetails")
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const demoController = require('../controller/product/demo')
const demoControllerPost = require('../controller/product/DemoPost')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const updateUserProfile = require('../controller/user/updateUserProfile')
const shoppingHistory = require('../controller/user/shoppingHistory')
const getShoppingHistory = require('../controller/user/getShoppingHistory')
const searchProduct = require('../controller/product/searchProduct')
const Order = require('../models/shoppingHistoryModel')
const createMantenimiento = require('../controller/user/mantenimientoPreventivo')
const getTasks = require('../controller/user/getTasks')
const deleteUser = require('../controller/user/deleteUser')
const getSupport = require('../controller/user/getSupport')
const uploadComputer = require('../controller/user/uploadComputer')
const getComputer = require('../controller/user/getComputer')
const { actualizarTarea } = require('../controller/user/actualizarTarea')
const { createMantenimientoCorrectivo } = require('../controller/user/mantenimientoCorrectivo')
const getMantenimientoCorrectivo = require('../controller/user/getMantenimientoCorrectivo')
const filterProductController = require('../controller/product/filterProduct')

//demo
router.get("/demo", demoController)
router.post("/demo-post", demoControllerPost)

//user
router.post("/sign-up", userSignUp)
router.post("/sign-in", userSignIn)
router.get("/user-datails", authToken, userDetailsController)
router.get("/userLogout", userLogout)
router.post("/update-user-profile", authToken, updateUserProfile)
router.post("/payment", authToken, shoppingHistory)
router.get("/shopping-history",authToken, getShoppingHistory )
router.delete("/delete-user", authToken, deleteUser)
router.get("/get-support", authToken, getSupport)
router.post("/upload-computer", authToken, uploadComputer )
router.get("/get-computer",authToken, getComputer )

//admin panel
router.get("/all-user", authToken, allUsers )
router.post("/update-user",authToken, updateUser)

router.get('/sales-report/monthly', async (req, res) => {
    try {
      const report = await Order.aggregate([
        {
          $group: {
            _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
            totalSales: { $sum: "$totalPrice" },
            totalOrders: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ]);
      res.json(report);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/sales-report/products', async (req, res) => {
    try {
      const report = await Order.aggregate([
        { $unwind: "$products" },
        {
            $lookup: {
                from: "products", // Nombre de la colección de productos
                localField: "products.productId",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        { $unwind: "$productDetails" },
        {
            $group: {
                _id: "$products.productId",
                productName: { $first: "$productDetails.productName" }, // Usamos $first para obtener el primer nombre del producto
                totalSold: { $sum: "$products.quantity" },
                totalRevenue: { $sum: { $multiply: ["$products.quantity", "$products.sellingPrice"] } }
            }
        },
        {
            $sort: { totalRevenue: -1 }
        }
      ]);
      res.json(report);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  

//product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)

//user add to cart
router.post("/addtocart",authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-card-product", authToken, addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)
router.post("/filter-product",filterProductController)


//mantenimientos
router.post("/mantenimiento-preventivo", authToken, createMantenimiento)
router.get("/tareas-tecnico", authToken, getTasks);
router.post('/mantenimiento-correctivo', authToken, createMantenimientoCorrectivo);
router.get("/tareas-correctivo", authToken, getMantenimientoCorrectivo);


//panel tecnico
router.put('/actualizarTarea/:id',authToken, actualizarTarea);

module.exports = router