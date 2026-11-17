// src/pages/MainPage.tsx
import React from 'react';
import MainSearchBlock from '../components/MainSearchBlock/MainSearchBlock';
import AboutUs from '../components/AboutUs/AboutUs';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Reviews from '../components/Reviews/Reviews';

const MainPage: React.FC = () => {
  return (
    <>
      <MainSearchBlock />
      <AboutUs />
      <HowItWorks />
      <Reviews />
    </>
  );
};

export default MainPage;