import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Paths } from './paths';
import Home from '../pages/user/home';
import About from '../pages/user/about';
import Layout from '../layout/Layout';
import ServicesPage from '../pages/user/services';
import LoginPage from '../pages/login';
import SignUpPage from '../pages/signup';
import ServiceDetailPage from '../pages/user/service-detail';
import { useAuthStore } from '../store/auth';
import Dashboard from '../pages/admin/dashboard';
import SPHomePage from '../pages/service-provider/home';
import FeedbackPage from '../pages/service-provider/feedback-page';
import Profile from '../pages/profile';
import Upcoming from '../pages/service-provider/upcoming';
import HistoryListing from '../pages/user/history';
import GetFeedBackPage from '../pages/user/get-feedback';

const GetRoutes = ({ userType }: { userType: string }) => {
  if (userType === 'admin') {
    return (
      <>
        <Routes>
          <Route path={Paths.Home} element={<Dashboard />} />
        </Routes>
      </>
    );
  } else if (userType === 'service_provider') {
    return (
      <Routes>
        <Route element={<Layout />}>
          <Route path={Paths.Home} element={<SPHomePage />} />
          <Route path={Paths.About} element={<About />} />
          <Route path={Paths.Feedback} element={<FeedbackPage />} />
          <Route path={Paths.ServiceDetail} element={<ServiceDetailPage />} />
        </Route>
        <Route path={Paths.Upcoming} element={<Upcoming />} />
        <Route path={Paths.Profile} element={<Profile />} />
        <Route path={Paths.SignIn} element={<LoginPage />} />
        <Route path={Paths.SignUp} element={<SignUpPage />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route element={<Layout />}>
          <Route path={Paths.Home} element={<Home />} />
          <Route path={Paths.About} element={<About />} />
          <Route path={Paths.Services} element={<ServicesPage />} />
          <Route path={Paths.ServiceDetail} element={<ServiceDetailPage />} />
        </Route>
        <Route path={Paths.GetFeedback} element={<GetFeedBackPage />} />
        <Route path={Paths.History} element={<HistoryListing />} />
        <Route path={Paths.Profile} element={<Profile />} />
        <Route path={Paths.SignIn} element={<LoginPage />} />
        <Route path={Paths.SignUp} element={<SignUpPage />} />
      </Routes>
    );
  }
};

const Navigator = () => {
  const { user } = useAuthStore((state) => state);
  return <GetRoutes userType={user?.userType ?? ''} />;
};

export default Navigator;
