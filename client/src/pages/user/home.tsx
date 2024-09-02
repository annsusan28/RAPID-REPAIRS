import React from 'react';
import FAQ from '../../component/faq/faq';
import Services from '../../component/services/services';
import Banner from '../../component/banner/banner';

const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
      <FAQ />
    </div>
  );
};

export default Home;
