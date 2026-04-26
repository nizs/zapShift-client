
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';

const SendParcel = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const serviceCenters = useLoaderData();

    const duplicatedRegions = serviceCenters.map(center => center.region);
    const regions = [...new Set(duplicatedRegions)];

    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });

    
    const districtsByRegion = region => {
        const DistrictsOfRegions = serviceCenters.filter(c => c.region === region).map(d => d.district);;
        // const districts = DistrictsOfRegions
        return DistrictsOfRegions;
    }

    const handleaddParcel = (data) => {
        console.log(data);
        const isDocument = data.parcelType === 'document';
        const sameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);

        let cost = 0;
        if (isDocument) {
            cost = sameDistrict ? 80 : 120;
        }
        else {
            if (parcelWeight < 3) {
                cost = sameDistrict ? 130 : 170
            }
            else {
                const extraWeight = parcelWeight - 3;
                const minimumCost = 130 + extraWeight * 40;
                const extraCost = minimumCost + 40;

                cost = sameDistrict ? minimumCost : extraCost
            }
        }
        console.log('parcel cost', cost)
    }

    return (
        <div className="bg-white p-6 md:p-12">
            <div className="text-neutral">
                <h1 className="text-3xl md:text-5xl font-bold">Send A Parcel</h1>
                <h2 className="text-xl md:text-3xl mt-4 font-bold">Enter your parcel details</h2>
            </div>
            <div className="flex w-full flex-col">
                <div className="divider"></div>
            </div>
            {/* radio buttons */}
            <div className="flex items-center mb-4">
                <label className="flex items-center me-8 cursor-pointer">
                    <input type="radio" {...register("parcelType")} value="document" className="radio radio-sm text-primary" />
                    <span className="ms-1">Document</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" {...register("parcelType")} value="Non Document" className="radio radio-sm text-primary" />
                    <span>Non Document</span>
                </label>
            </div>
            {/* Add parcel form */}
            <form onSubmit={handleSubmit(handleaddParcel)}>
                {/* name and weight */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register("parcelName")} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset flex-1">
                        <label className="label">Parcel Weight (KG)</label>
                        <input type="text" {...register("parcelWeight")} className="input w-full" placeholder="Parcel Weight (KG)" />
                    </fieldset>
                </div>

                {/* sender and receiver details */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
                    {/* Sender ditails */}
                    <div className="mt-4">
                        <h3 className="font-bold mt-6 mb-2">Sender Details</h3>
                        {/* sender name */}
                        <fieldset className="fieldset flex-1">
                            <label className="label"> Sender Name</label>
                            <input type="text" {...register("senderName")} className="input w-full" placeholder="Sender Name" />
                        </fieldset>
                        {/* sender email */}
                        <fieldset className="fieldset flex-1">
                            <label className="label"> Sender Email</label>
                            <input type="text" {...register("senderEmail")} className="input w-full" placeholder="Sender Email" />
                        </fieldset>
                        {/* sender address */}
                        <fieldset className="fieldset flex-1">
                            <label className="label">Sender Address</label>
                            <input type="text" {...register("senderAddress")} className="input w-full" placeholder="Sender Address" />
                        </fieldset>
                        {/* sender phonen no */}
                        <fieldset className="fieldset flex-1">
                            <label className="label">Sender Phone</label>
                            <input type="number" {...register("senderPhone")} className="input w-full" placeholder="Sender Phone no" />
                        </fieldset>
                        {/* sender Region */}
                        <fieldset className="fieldset">
                            <label className="label">Sender Region</label>
                            <select {...register('senderRegion')} defaultValue="Pick a Region" className="select w-full cursor-pointer">
                                <option disabled={true}>Pick a Region</option>
                                {regions.map((region, index) => <option key={index}>{region}</option>)}
                            </select>
                        </fieldset>
                        {/* sender District */}
                        <fieldset className="fieldset">
                            <label className="label">Sender District</label>
                            <select {...register('senderDistrict')} defaultValue="Pick a District" className="select w-full cursor-pointer">
                                {/* <option disabled={true}>Pick a District</option> */}
                                {districtsByRegion(senderRegion).map((district, index) => <option
                                    key={index}
                                    value={district}
                                >{district}</option>)}
                            </select>
                        </fieldset>
                    </div>
                    {/* Receiver ditails */}
                    <div className="mt-4">
                        <h3 className="font-bold mt-6 mb-2">Receiver Details</h3>
                        {/* Receiver name */}
                        <fieldset className="fieldset">
                            <label className="label"> Receiver Name</label>
                            <input type="text" {...register("receiverName")} className="input w-full" placeholder="Receiver Name" />
                        </fieldset>
                        {/* Receiver email */}
                        <fieldset className="fieldset flex-1">
                            <label className="label"> Receiver Email</label>
                            <input type="text" {...register("receiverEmail")} className="input w-full" placeholder="Receiver Email" />
                        </fieldset>
                        {/* Receiver address */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver Address</label>
                            <input type="text" {...register("receiverAddress")} className="input w-full" placeholder="Receiver Address" />
                        </fieldset>
                        {/* Receiver phonen no */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver Phone</label>
                            <input type="number" {...register("receiverPhone")} className="input w-full" placeholder="Receiver Phone no" />
                        </fieldset>
                        {/* Receiver Region */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver Region</label>
                            <select {...register('receiverRegion')} defaultValue="Pick a Region" className="select w-full cursor-pointer">
                                <option>Pick your Region</option>
                                {regions.map((region, index) => <option key={index}>{region}</option>)}
                            </select>
                        </fieldset>
                        {/* Receiver District */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver District</label>
                            <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select w-full cursor-pointer">
                                {districtsByRegion(receiverRegion).map((district, index) => <option key={index}>{district}</option>)}
                            </select>
                        </fieldset>
                    </div>
                </div>
                <p className='text-[13px] mt-4'>*PickUp Time 4pm-7pm Approx</p>
                <button type="submit" className="btn btn-primary text-white mt-4">
                    Send Parcel
                </button>
            </form>
        </div>
    );
};

export default SendParcel;