import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const MainLayout = () => {
    return (
        <div className='bg-gray-200 max-w-7xl mx-auto py-8'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;