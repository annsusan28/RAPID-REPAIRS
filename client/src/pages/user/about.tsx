import React from 'react';
import FAQ from '../../component/faq/faq';
import AboutComponent from '../../component/about/about';
const About: React.FC = () => {
  return (
    <div>
      <div className='breadcrumbs'>
        <div
          className='page-header d-flex align-items-center'
          style={{ backgroundImage: 'url(assets/img/page-header2.jpg)' }}
        >
          <div className='container position-relative'>
            <div className='row d-flex justify-content-center'>
              <div className='col-lg-6 text-center'>
                <h2>About</h2>
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <nav>
          <div className='container'>
            <ol>
              <li>
                <a href='index.html'>Home</a>
              </li>
              <li>About</li>
            </ol>
          </div>
        </nav>
      </div>

      <AboutComponent />

      <FAQ />
    </div>
  );
};

export default About;
