import { Link } from 'react-router-dom';
import FAQ from '../../component/faq/faq';
import Services from '../../component/services/services';

const ServicesPage = () => {
  return (
    <div>
      <div className='breadcrumbs'>
        <div
          className='page-header d-flex align-items-center'
          style={{ backgroundImage: 'url(/assets/img/page-header2.jpg)' }}
        >
          <div className='container position-relative'>
            <div className='row d-flex justify-content-center'>
              <div className='col-lg-6 text-center'>
                <h2>Services</h2>
              </div>
            </div>
          </div>
        </div>
        <nav>
          <div className='container'>
            <ol>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>Services</li>
            </ol>
          </div>
        </nav>
      </div>
      <Services />
      <FAQ />
    </div>
  );
};

export default ServicesPage;
