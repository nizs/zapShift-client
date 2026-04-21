import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const MainLayout = () => {
    return (
        <div className="bg-gray-200 min-h-screen">

            {/* GLOBAL TOAST SYSTEM */}
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <div className="max-w-7xl mx-auto py-8">
                <Navbar />
                <Outlet />
                <Footer />
            </div>

        </div>
    );
};

export default MainLayout;