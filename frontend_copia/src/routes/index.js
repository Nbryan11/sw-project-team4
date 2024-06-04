import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import Demo from '../pages/Demoo'
import DemoPost from '../pages/DemoPost';
import ProductDetails from '../pages/ProductDetails';
import Serviceform from '../pages/serviceForm';
import ProfileClient from '../pages/ProfileClient';
import Cart from '../pages/Cart';
import ClientPanel from '../pages/clientPanel';
import InformationClient from '../pages/information';
import HistoryShopping from '../pages/historyShopping';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "product-category/:categoryName",
        element: <CategoryProduct/>
      },
      {
        path: "demo",
        element: <Demo/>
      },
      
      {
        path: "demo-post",
        element: <DemoPost/>
      },
      {
        path: "/product/:id",
        element: <ProductDetails/>
      },
      {
        path: "service-form",
        element: <Serviceform/>
      },
      {
        path: "my-profile",
        element: <ProfileClient/>
      },
      
      
      {
        path: "cart",
        element: <Cart/>
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path : "all-users",
            element: <AllUsers/>
          },
          {
            path: "all-products",
            element: <AllProducts />
          }
        ]
      },
      {
        path: "clientPanel",
        element: <ClientPanel />,
        children: [
          {
            path : "information",
            element: <InformationClient/>
          },
          {
            path: "history-shopping",
            element: <HistoryShopping/>
          },
        ]
      }
    ]

  }
]);

export default router;