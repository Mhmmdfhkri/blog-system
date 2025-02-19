import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import Img1 from "../../assets/flp1.jpg"
import Img2 from "../../assets/flp2.png"
import Img3 from "../../assets/flp3.png"
import Img4 from "../../assets/flp4.png"
import Img5 from "../../assets/flp5.png"


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8">
      <div className="md:w-1/2 w-full text-center">
        <h1 className="md:text-5xl text-3xl font-bold md:leading-tight">
        Berbakti, Berkarya, <span className="text-indigo-600">Berarti</span> 
        </h1>
        <p className="py-4">
        Discovering hotels with rooftop pools near you! Whether you’re planning
        a luxurious staycation or a weekend getaway, our curated selection of
        hotels with rooftop pools will help you beat the heat and elevate your
        travel experience.
      </p>
      </div>
      
      <div className="md:w-1/2 w-full mx-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}  
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src={Img1} alt="" className="w-full lg:h-[420px] sm:h-80 h-80"/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={Img5} alt="" className="w-full lg:h-[420px] sm:h-96 h-80"/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={Img3} alt="" className="w-full lg:h-[420px] sm:h-96 h-80"/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={Img4} alt="" className="w-full lg:h-[420px] sm:h-96 h-80"/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={Img2} alt="" className="w-full lg:h-[420px] sm:h-96 h-80"/>
        </SwiperSlide>
      </Swiper>
      </div>
    </div>
  );
};

export default Hero;
