import React from 'react';

const Banner = () => {
  return (
    <section id='hero' className='hero d-flex align-items-center'>
      <div className='container'>
        <div className='row gy-4 d-flex justify-content-between'>
          <div className='col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center'>
            <h2 data-aos='fade-up'>
              Streamlining your home, simplifying your life.
            </h2>
            <p data-aos='fade-up' data-aos-delay='100'>
              Harmonizing the complexities of household management, our
              dedicated services offer a seamless blend of precision, care, and
              convenience, creating a sanctuary where every detail is
              meticulously tended to, allowing you to embrace life's moments
              with ease and tranquility."
            </p>
          </div>

          <div
            className='col-lg-5 order-1 order-lg-2 hero-img'
            data-aos='zoom-out'
          >
            <img
              src='assets/img/hero-img.svg'
              className='img-fluid mb-3 mb-lg-0'
              alt=''
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
