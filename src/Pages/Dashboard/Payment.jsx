import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../Components/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Payment = () => {
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if (isLoading) {
        return <Loading />
    }

    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
        window.location.href = res.data.url;
    }

    return (
        <div>
            <h2>Please Pay {parcel.cost} for {parcel.parcelName}</h2>
            <Link><button onClick={handlePayment} className="btn btn-primary text-black btn-sm">Pay</button></Link>
        </div>
    );
};

export default Payment;