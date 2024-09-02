import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { getAllServiceProviders, updateVerification } from '../../api/admin';
import { useQuery } from 'react-query';
import { useGenericMutation } from '../../hooks/useMutation';
import { showToast } from '../../component/ui/toast';

const Dashboard = () => {
  const { setAuthenticated, setUserData } = useAuthStore((state) => state);

  const { data, refetch } = useQuery(
    ['getAllSetviceProviders'],
    getAllServiceProviders
  );

  const { mutate } = useGenericMutation<
    unknown,
    unknown,
    { id: string; status: 'active' | 'inactive' }
  >(updateVerification, {
    onError: () => {
      showToast({
        message: 'Error updating the status',
        variant: 'error',
      });
    },
    onSuccess: () => {
      showToast({
        variant: 'success',
        message: 'Updated successfully',
      });
      refetch();
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    const selectHeader = document.querySelector('#header');
    const onScroll = () => {
      window.scrollY > 100
        ? selectHeader?.classList.add('sticked')
        : selectHeader?.classList.remove('sticked');
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  const signOut = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    setUserData(null);
    navigate('/');
  };

  const handleStatus = (id: number, status: boolean) => {
    mutate({
      id: String(id ?? ''),
      status: status ? 'active' : 'inactive',
    });
  };

  return (
    <div className='main'>
      <header
        id='header'
        className='header d-flex align-items-center fixed-top'
      >
        <div className='container-fluid container-xl d-flex align-items-center justify-content-between'>
          <Link to='/' className='logo d-flex align-items-center'>
            <h1>RAPID REPAIRS</h1>
          </Link>
          <i className='mobile-nav-toggle mobile-nav-show bi bi-list'></i>
          <i className='mobile-nav-toggle mobile-nav-hide d-none bi bi-x'></i>
          <nav id='navbar' className='navbar'>
            <ul>
              <li>
                <Link to='/' className='active'>
                  Dashboard
                </Link>
              </li>
              <li>
                <button className='get-a-quote' onClick={signOut}>
                  SIGN OUT
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section id='hero' className='hero d-flex align-items-center'>
        <div className='container'>
          <h2>Welcome to the Admin Dashboard</h2>
          <p>
            Here you can manage your website's content, users, orders, and more.
          </p>
        </div>
      </section>

      <main>
        <h3>Service Provider Register</h3>
        <table>
          <thead>
            <tr>
              <th>Fullname</th>
              <th>email</th>
              <th>work</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>DOB</th>
              <th>contact-number</th>
              <th>Verify</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item) => (
              <tr key={item.user_id}>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.service_type}</td>
                <td>{item?.qualification}</td>
                <td>{item?.years_of_experience}</td>
                <td>{item?.birth_date?.split('T')[0]}</td>

                <td>{item?.phone_no}</td>
                <td>
                  <input
                    type='checkbox'
                    name='verification_1'
                    checked={item?.status === 'active'}
                    onChange={(e) => {
                      handleStatus(item.user_id, e.target.checked);
                    }}
                  />
                  {item.status === 'active' ? 'Verified' : 'Not Verified'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer id='footer' className='footer' style={{ marginTop: '40px' }}>
        <div className='container'>
          <div className='row gy-4'>
            <div className='col-lg-5 col-md-12 footer-info'>
              <a href='index.html' className='logo d-flex align-items-center'>
                <span>Rapid Repairs</span>
              </a>
              <p>
                Rapid Repairs, your one-stop Center for plumbing, carpentry,
                cleaning, Roofing, electrical and home painting needs.
              </p>
              <div className='social-links d-flex mt-4'>
                <a href='#' className='twitter'>
                  <i className='bi bi-twitter'></i>
                </a>
                <a href='#' className='facebook'>
                  <i className='bi bi-facebook'></i>
                </a>
                <a href='#' className='instagram'>
                  <i className='bi bi-instagram'></i>
                </a>
                <a href='#' className='linkedin'>
                  <i className='bi bi-linkedin'></i>
                </a>
              </div>
            </div>

      

            <div className='col-lg-2 col-6 footer-links'>
              <h4>Our Services</h4>
              <ul>
                <li>
                  <a href='#'>Plumbing</a>
                </li>
                <li>
                  <a href='#'>Carpentry</a>
                </li>
                <li>
                  <a href='#'>Cleaning</a>
                </li>
                <li>
                  <a href='#'>Home Painting</a>
                </li>
                <li>
                  <a href='#'>Electrical works</a>
                </li>
                <li>
                  <a href='#'>Roofing Repairs</a>
                </li>
              </ul>
            </div>

            <div className='col-lg-3 col-md-12 footer-contact text-center text-md-start'>
              <h4>We are</h4>
              <p>
                Team 10 <br />
                S6,CSE-B
                <br />
                SJCET,Palai <br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
