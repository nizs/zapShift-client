import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const Banner = () => {
  const slides = useLoaderData(); // dynamic data from router
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full relative my-6">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-[60vh] md:h-[75vh] lg:h-[85vh] rounded-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="w-full h-full bg-black/40 flex items-center lg:px-4">
                <div className="md:mx-auto lg:mx-0 mt-5 px-6 text-white">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 lg:w-1/2 lg:mt-12">
                    <span className="text-white me-2">{slide.title_secondary}</span>
                    <span className="text-primary me-2">{slide.title_primary}</span>
                    <span className="text-white">{slide.title_secondary_second}</span>
                  </h1>
                  <p className="text-sm md:text-lg lg:text-xl mb-6 text-gray-200">
                    {slide.subtitle}
                  </p>

                  <div className="flex gap-4">
                    <button className="btn btn-primary text-white">
                      Send Parcel
                    </button>
                    <button className="btn btn-outline text-white border-white hover:bg-white hover:text-black">
                      Become a Rider
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔥 Custom DASH Pagination */}
      <div className="absolute bottom-6 left-1/2 lg:left-1/12 lg:top-5/6 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-[4px] rounded-full transition-all duration-300
              ${
                activeIndex === index
                  ? "w-10 bg-primary"
                  : "w-6 bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;