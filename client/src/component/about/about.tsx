import React from 'react';

const AboutComponent = () => {
  return (
    <section id='about' className='about'>
      <div className='container' data-aos='fade-up'>
        <div className='row gy-4'>
          <div className='col-lg-6 position-relative align-self-start order-lg-last order-first'>
            <img
              src='https://thumbs.dreamstime.com/b/home-service-repair-construction-fix-house-background-home-service-repair-construction-fix-house-background-155882678.jpg'
              className='img-fluid'
              alt=''
            />
            <a href='https://thumbs.dreamstime.com/b/home-service-repair-construction-fix-house-background-home-service-repair-construction-fix-house-background-155882678.jpg'></a>
          </div>
          <div className='col-lg-6 content order-last order-lg-first'>
            <h3>About Us</h3>
            <p>
              At Rapid Repairs, we specialize in providing comprehensive
              household services designed to simplify your life and elevate your
              home experience. From routine cleaning and maintenance to
              specialized tasks, our expert team is dedicated to ensuring that
              every aspect of your home runs smoothly. With a focus on
              reliability, efficiency, and attention to detail, we take pride in
              delivering tailored solutions that meet your unique needs. Whether
              you're seeking regular upkeep or assistance with specific
              projects, trust us to handle your household management with care
              and professionalism, so you can enjoy a more comfortable and
              stress-free living environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
