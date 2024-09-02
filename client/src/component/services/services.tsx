import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const servicesData = [
  {
    imgSrc: 'assets/img/plumbing.jpeg',
    title: 'PLUMBING',
    description:
      'Plumbing is essential for the distribution of clean water and removal of waste. Professional plumbers ensure the integrity and efficiency of these systems.',
    id: 'plumbing',
  },
  {
    imgSrc: 'assets/img/carpentary.jpeg',
    title: 'CARPENTRY',
    description:
      'Carpentry blends craftsmanship with creativity, shaping wood into functional and aesthetic wonders. From furniture to structures, skilled carpenters bring visions to life.',
    id: 'carpentry',
  },
  {
    imgSrc: 'assets/img/cleaning.jpeg',
    title: 'CLEANING',
    description:
      'Cleanliness is key to health and well-being. Our meticulous cleaning services ensure sparkling results, transforming spaces into pristine havens.',
    id: 'cleaning',
  },
  {
    imgSrc: 'assets/img/painting.jpeg',
    title: 'HOME PAINTING',
    description:
      'Transform your home with a splash of color! Our expert painters bring life to your walls, creating personalized spaces that reflect your style and personality.',
    id: 'painting',
  },
  {
    imgSrc: 'assets/img/electrical.jpeg',
    title: 'ELECTRICAL WORKS',
    description:
      'Illuminate your space with confidence. Our electrical experts ensure safety and reliability, delivering solutions that power your world.',
    id: 'electrical',
  },
  {
    imgSrc: 'assets/img/roofing.jpeg',
    title: 'ROOFING REPAIRS',
    description:
      'Protect your home with expert roofing repairs. Our skilled team ensures durability and reliability, safeguarding your property from the elements.',
    id: 'roofing',
  },
];

const Services = () => {
  return (
    <section id='service' className='services pt-0'>
      <motion.div
        className='container'
        initial={{ opacity: 0, translateY: 100 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className='container' data-aos='fade-up'>
          <div className='section-header'>
            <span>Our Services</span>
            <h2>Our Services</h2>
          </div>

          <div className='row gy-4'>
            {servicesData.map((service, index) => (
              <div className='col-lg-4 col-md-6' data-aos='fade-up' key={index}>
                <div className='card'>
                  <div className='card-img'>
                    <img
                      src={service.imgSrc}
                      alt={service.title}
                      className='img-fluid'
                    />
                  </div>
                  <h3>
                    <Link
                      to={`/services/${service.id}`}
                      className='stretched-link'
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
