import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

const Header = () => {
  const { pathname } = useLocation();
  const location = pathname?.split('/')[1];
  const { authenticated, user } = useAuthStore((state) => state);

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

  return (
    <header id='header' className='header d-flex align-items-center fixed-top'>
      <div className='container-fluid container-xl d-flex align-items-center justify-content-between'>
        <Link to='/' className='logo d-flex align-items-center'>
          <h1>RAPID REPAIRS</h1>
        </Link>
        <i className='mobile-nav-toggle mobile-nav-show bi bi-list'></i>
        <i className='mobile-nav-toggle mobile-nav-hide d-none bi bi-x'></i>
        <nav id='navbar' className='navbar'>
          <ul>
            <li>
              <Link to='/' className={location === '/' ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className={location === 'about' ? 'active' : ''}
              >
                About
              </Link>
            </li>
            <li>
              {user?.userType !== 'service_provider' ? (
                <Link
                  to='/services'
                  className={location === 'services' ? 'active' : ''}
                >
                  Services
                </Link>
              ) : (
                <Link
                  to='/feedback'
                  className={location === 'feedback' ? 'active' : ''}
                >
                  Feedback
                </Link>
              )}
            </li>
            <li>
              {user?.userType === 'service_provider' ? (
                <Link
                  to='upcoming'
                  className={location === 'upcoming' ? 'active' : ''}
                >
                  Upcoming Jobs
                </Link>
              ) : (
                <Link
                  to='history'
                  className={location === 'history' ? 'active' : ''}
                >
                  History
                </Link>
              )}
            </li>
            {!authenticated && (
              <li>
                <Link
                  to='/sign-in'
                  className={
                    location === 'sign-in'
                      ? 'active get-a-quote'
                      : 'get-a-quote'
                  }
                  id='sign-in'
                >
                  SIGN IN
                </Link>
              </li>
            )}
            {authenticated && (
              <li>
                <Link to='/profile'>
                  <img
                    src='https://cdn-icons-png.flaticon.com/512/4715/4715329.png'
                    width='60'
                    height='60'
                    alt=''
                    className='img-fluid'
                  />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
