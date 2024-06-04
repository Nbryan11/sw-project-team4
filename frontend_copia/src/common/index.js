
const backendDomain = "http://localhost:8080"
const SummaryApi = {
    SignUp  : {
        url : `${backendDomain}/api/sign-up`,
        method : "post"
    },

    SignIn: {
        url: `${backendDomain}/api/sign-in`,
        method : "post"
    },
    
    current_user:{
        url: `${backendDomain}/api/user-datails`,
        method: "get"
    },

    logOut:{
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser : {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    updateUserProfile: {
        url: `${backendDomain}/api/update-user-profile`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "get"
    },
    demo:{
        url : `${backendDomain}/api/demo`,
        method: "get"
    }, 
    demoPost:{
        url: `${backendDomain}/api/demo-post`,
        method: "post"
    },
    categoryWiseProduct:{
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetails:{
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"

    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: "get"
    },
    addToCartProductView: {
        url: `${backendDomain}/api/view-card-product`,
        method: "get"

    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'post'
    },
    shoppingHistory: {
        url: `${backendDomain}/api/payment`,
        method: 'post'
    },
    getHistoryShopping: {
        url: `${backendDomain}/api/shopping-history`,
        method: "get"
    }



}

export default SummaryApi