import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../Layout/AuthLayout';
import MainLayout from '../Layout/MainLayout';
import About from '../Pages/About/About';
import Blog from '../Pages/Blog/Blog';
import Contact from '../Pages/Contact/Contact';
import Coverage from '../Pages/Coverage/Coverage';
import Home from '../Pages/Home/Home';
import Signin from '../Pages/Shared/Signin';
import Register from '../Pages/Shared/Register';
import PrivateRoute from './PrivateRoute';
import Rider from '../Pages/Rider/Rider';
import SendParcel from '../Pages/SendParcel/SendParcel';
import DashboradLayout from '../Layout/DashboradLayout';
import MyParcels from '../Pages/Dashboard/MyParcels';
import Payment from '../Pages/Dashboard/Payment';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
                loader: async () => {
                    const res = await fetch("/public/banner.json");
                    return res;
                }
            },
            {
                path: "coverage",
                Component: Coverage
            },
            {
                path: "about",
                Component: About
            },
            {
                path: "blog",
                Component: Blog
            },
            {
                path: "rider",
                element: <PrivateRoute><Rider /></PrivateRoute>
            },
            {
                path: "sendParcel",
                element: <PrivateRoute><SendParcel /></PrivateRoute>,
                loader: () => fetch('./warehouses.json').then(res => res.json())
            },
            {
                path: "contact",
                Component: Contact
            },
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "signin",
                Component: Signin
            },
            {
                path: "register",
                Component: Register
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboradLayout /></PrivateRoute>,
        children: [
            {
                path: "my-parcels",
                Component: MyParcels
            },
            {
                path: "payment/:parcelId",
                Component: Payment
            }
        ]
    }
])