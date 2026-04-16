import React from 'react';
import Banner from '../../Components/Banner';
import Brands from '../../Components/Brands';
import Services from '../../Components/Services';
import WhyChooseUs from '../../Components/WhyChooseUs';

const Home = () => {
    return (
        <>
            <Banner />
            <Services />
            <Brands />
            <WhyChooseUs />
        </>
    );
};

export default Home;