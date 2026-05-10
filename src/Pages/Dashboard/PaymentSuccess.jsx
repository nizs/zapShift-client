import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div>
            <h1>payment Successfull</h1>
            <Link to='/dashboard/my-parcels'>My Parcels</Link>
        </div>
    );
};

export default PaymentSuccess;