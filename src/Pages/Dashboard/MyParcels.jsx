import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { CiEdit } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2'
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }

    })

    const handleParcelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Parcel has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 m-16">
            <table className="table table-zebra w-full">

                {/* head */}
                <thead>
                    <tr className="text-center">
                        <th className="w-16">Parcel No.</th>
                        <th className="text-left">Parcel Name</th>
                        <th className="w-24">Cost</th>
                        <th className="w-24">Payments</th>
                        <th className="w-24">Delivery Status</th>
                        <th className="w-40">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        parcels.map((parcel, index) => (
                            <tr key={index} className="text-center">

                                {/* Parcel No */}
                                <th className="w-16">
                                    {index + 1}
                                </th>

                                {/* Name */}
                                <td className="text-left">
                                    {parcel.parcelName}
                                </td>

                                {/* Cost */}
                                <td className="w-24">
                                    {parcel.cost}
                                </td>

                                {/* Payments */}
                                <td className="w-24">
                                    {
                                        parcel.paymentStatus === "paid" ? <span className="text-green-400">Paid</span> : <Link to={`/dashboard/payment/${parcel._id}`}><button className="btn btn-primary text-black btn-sm">Pay</button></Link>
                                    }
                                </td>

                                {/* Delivery Status */}
                                <td className="w-24">
                                    {parcel.deliveryStatus}
                                </td>

                                {/* Actions */}
                                <td className="w-40">
                                    <div className="flex justify-center items-center gap-2">
                                        <button className="btn btn-square hover:bg-primary">
                                            <CiEdit />
                                        </button>

                                        <button className="btn btn-square hover:bg-primary">
                                            <FaMagnifyingGlass />
                                        </button>

                                        <button onClick={() => { handleParcelDelete(parcel._id) }} className="btn btn-square hover:bg-primary">
                                            <MdDeleteOutline />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;