import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const Brands = () => {
    const { data: brands = [], isLoading } = useQuery({
        queryKey: ["brands"],
        queryFn: async () => {
            const res = await axios.get("./brands.json");
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="py-10 text-center"><Loading /></div>;
    }

    return (
        <div className="py-18 px-4 md:px-8 bg-transparent">
            <div className="max-w-7xl mx-auto text-center">

                {/* Heading */}
                <h2 className="text-xl md:text-3xl font-bold text-[#03373D] mb-10">
                    We've helped thousands of sales teams
                </h2>

                {/* Swiper */}
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={2}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
                    className="items-center"
                >
                    {brands.map((brand) => (
                        <SwiperSlide key={brand.id}>
                            <div className="flex justify-center items-center p-4">
                                <img
                                    src={brand.image}
                                    alt="brand"
                                    className="h-6 md:h-6 object-contain transition duration-300"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    );
};

export default Brands;