import React from 'react';
import FeedbackComp from '../../component/feedback/feedback';

const FeedbackPage = () => {
  return (
    <div>
      <section id='hero' className='hero d-flex align-items-center'>
        <div className='container'>
          <div className='row gy-4 d-flex justify-content-between'>
            <div className='col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center'>
              <h2 data-aos='fade-up'>FEEDBACK</h2>
              <p data-aos='fade-up' data-aos-delay='100'>
                Feedback given by customer who used your services
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
      <FeedbackComp />
    </div>
  );
};

export default FeedbackPage;
