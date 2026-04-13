import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { iconMap } from "../../src/utils/iconMap"
import Loading from "./Loading";

const Services = () => {
    const { data: services = [], isLoading } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await axios.get("/services.json");
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="text-center py-10"><Loading /></div>;
    }

    return (
        <div className="bg-[#03373D] py-16 px-4 md:px-8 rounded-xl">
            <div className="max-w-7xl mx-auto text-center">

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold bg-white inline-block px-6 py-2 rounded mb-4">
                    Our Services
                </h2>

                {/* Subheading */}
                <p className="text-[#DADADA] max-w-2xl mx-auto mb-12">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {services.map((service) => {
                        const Icon = iconMap[service.icon];

                        return (
                            <div
                                key={service.id}
                                className="group bg-white rounded-xl p-6 shadow-md 
                                transition-all duration-300 hover:bg-primary 
                                hover:shadow-xl hover:-translate-y-1 
                                hover:border hover:border-primary"
                            >
                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    <div className="bg-gray-200 p-4 rounded-full">
                                        <Icon className="text-3xl text-[#03373D]" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-[#03373D] mb-2">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[#606060] text-sm">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
};

export default Services;