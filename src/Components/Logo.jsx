import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeliveryDining } from "react-icons/md";


const Logo = () => {
    return (
        <Link to="/" className="text-xl flex items-center">
            <MdDeliveryDining className="text-primary text-4xl"/>
            <span className="ms-1 font-bold text-accent hidden md:block ">ZapShift</span>
        </Link>
    );
};

export default Logo;