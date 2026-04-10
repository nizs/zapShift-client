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

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
                loader: async () => fetch("./banner.json")
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
                path: "/blog",
                Component: Blog
            },
            {
                path: "/contact",
                Component: Contact
            },
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "/signin",
                Component: Signin
            },
            {
                path: "/register",
                Component: Register
            }
        ]
    },
])