import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
    const link = <>
        <li className='font-bold text-gray-600'><Link to='/'>Home</Link></li>
        <li className='font-bold text-gray-600'><Link to='/coverage'>Coverage</Link></li>
        <li className='font-bold text-gray-600'><Link to='/blog'>Blog</Link></li>
        <li className='font-bold text-gray-600'><Link to='/about'>About</Link></li>
        <li className='font-bold text-gray-600'><Link to='/Contact'>Contact</Link></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm lg:px-8 rounded-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-100 mt-3 w-52 p-2 shadow">
                        {link}
                    </ul>
                </div>
                <Logo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {link}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/signin' className="btn me-2 bg-primary text-white">Signin</Link>
                <Link to='/register' className="btn">Signup</Link>
            </div>
        </div>
    );
};

export default Navbar;