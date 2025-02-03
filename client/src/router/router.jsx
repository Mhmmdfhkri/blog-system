/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/miniPage/About";
import ContactUs from "../pages/miniPage/ContactUs";
import PrivacyPolicy from "../pages/miniPage/PrivacyPolicy";
import SingleBlog from "../pages/blogs/singleBlog/SingleBlog.jsx";
import Login from "../pages/user/Login.jsx";
import Register from "../pages/user/Register.jsx";
import AdminLayout from "../pages/admin/AdminLayout.jsx";
import Dashboard from "../pages/admin/dashboard/Dashboard.jsx";
import Addpost from "../pages/admin/post/Addpost.jsx";
import ManagePost from "../pages/admin/post/ManagePost.jsx";
import ManageUser from "../pages/admin/user/ManageUser.jsx";
import PrivateRouter from "./PrivateRouter.jsx";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: '/about-us',
          element: <About/>
        },
        {
          path: '/privacy-policy',
          element: <PrivacyPolicy/>
        },
        {
          path: '/contact-us',
          element: <ContactUs/>
        },
        {
          path: '/blogs/:id',
          element: <SingleBlog/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "dashboard",
          element: <PrivateRouter><AdminLayout/></PrivateRouter>,  // it will be rotected by the admin: Use Private Router
          children: [
            {
              path: '',
              element: <Dashboard/>
            },
            {
              path: 'add-new-post',
              element: <Addpost/>
            },
            {
              path: 'manage-items',
              element: <ManagePost/>
            },
            {
              path: 'users',
              element: <ManageUser/>
            }
          ]
        }
      ]
    },
  ]);

  export default router;