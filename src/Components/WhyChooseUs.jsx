import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const WhyChooseUs = () => {
    const { data: features = [], isLoading } = useQuery({
        queryKey: ["whyChoose"],
        queryFn: async () => {
            const res = await axios.get("/whyChoose.json");
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="py-10 text-center"><Loading /></div>;
    }

    return (
        <div className="py-6 px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {features.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-center gap-6"
                    >

                        {/* Left Image */}
                        <div className="w-full md:w-1/3 flex justify-center">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-40 md:w-48 object-contain p-4"
                            />
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block h-32 border-l-2 border-dashed border-gray-300"></div>

                        {/* Right Content */}
                        <div className="w-full md:w-2/3 text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-semibold text-[#03373D] mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-500">
                                {item.description}
                            </p>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default WhyChooseUs;