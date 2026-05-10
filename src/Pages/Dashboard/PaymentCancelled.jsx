import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancelled = () => {
    return (
        <div>
            <h1>payment Cancelled</h1>
            <Link to='/dashboard/my-parcels'>Try Again</Link>
        </div>
    );
};

export default PaymentCancelled;