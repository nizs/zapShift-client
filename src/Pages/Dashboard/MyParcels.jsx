import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { CiEdit } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";



const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 m-4">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Percel No</th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        parcels.map((parcel, index) => <tr
                            key={index}
                        >
                            <th>{index + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>{parcel.cost}</td>
                            <td className="w-0"><button className="btn btn-square hover:bg-primary"><CiEdit /></button></td>
                            <td className="w-0"><button className="btn btn-square hover:bg-primary"><FaMagnifyingGlass /></button></td>
                            <td className="w-0"><button className="btn btn-square hover:bg-primary"><MdDeleteOutline />
                            </button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;