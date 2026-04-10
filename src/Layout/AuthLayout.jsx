import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../Components/Logo';
import authImage from '../assets/authImage.png';

const AuthLayout = () => {
    return (
        <div className='bg-gray-100'>
            <div>
                <div className='bg-white md:w-1/2 lg:w-1/2 pl-12 py-8'>
                    <Logo />
                </div>
                <div className='flex flex-col md:flex-row lg:flex-row md:items-center'>
                    <div className='flex-1'>
                        <Outlet />
                    </div>
                    <div className='flex-1'>
                        <img src={authImage} alt="authLayoutImage" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;