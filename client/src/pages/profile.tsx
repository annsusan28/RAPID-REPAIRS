import React, { useState, useEffect, ChangeEvent } from 'react';
import './profile.css';
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import {
  currentUser,
  updateCustomer,
  updateServiceProvider,
} from '../api/auth';
import { ServiceProviderDetails } from '../types/types';
import { useGenericMutation } from '../hooks/useMutation';
import { cities } from './user/service-detail';
import { showToast } from '../component/ui/toast';
import { updateLocationSP } from '../api/service-provider';
import { servicesData } from '../component/services/services';

const districts = [
  'Alappuzha',
  'Ernakulam',
  'Idukki',
  'Kannur',
  'Kasaragod',
  'Kollam',
  'Kottayam',
  'Kozhikode',
  'Malappuram',
  'Palakkad',
  'Pathanamthitta',
  'Thiruvananthapuram',
  'Thrissur',
  'Wayanad',
];

const getInputField = (value: string) => {
  if (value === 'service_provider') {
    return [
      { label: 'Name', id: 'name', type: 'text' },
      { label: 'Email', id: 'email', type: 'email' },
      { label: 'Role', id: 'role', type: 'text' },
      {
        label: 'Year of experience',
        id: 'years_of_experience',
        type: 'number',
      },
      { label: 'Birth date', id: 'birth_date', type: 'date' },
      { label: 'Qualification', id: 'qualification', type: 'text' },
      { label: 'Phone no', id: 'phone_no', type: 'tel' },
    ];
  } else {
    return [
      { label: 'Name', id: 'name', type: 'text' },
      { label: 'Email', id: 'email', type: 'email' },
      { label: 'Phone no', id: 'phone', type: 'tel' },
    ];
  }
};

const Profile: React.FC = () => {
  const { setAuthenticated, setUserData, user } = useAuthStore(
    (state) => state
  );
  const inputFields = getInputField(user?.userType ?? '');
  const [profile, setProfile] = useState(
    inputFields.reduce((acc, field) => {
      acc[field.id] = '';
      return acc;
    }, {} as Record<string, string>)
  );
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const { mutate } = useGenericMutation<ServiceProviderDetails>(currentUser, {
    onSuccess: (data) => {
      const userData = data.data;
      if (user?.userType === 'service_provider') {
        setProfile({
          name: userData?.name ?? '',
          email: userData?.email ?? '',
          role: userData?.role ?? '',
          years_of_experience: String(userData?.years_of_experience ?? ''),
          birth_date: userData?.birth_date
            ? new Date(userData?.birth_date ?? '')
                ?.toISOString()
                ?.split('T')[0] ?? ''
            : '',
          city: userData?.city ?? '',
          qualification: userData?.qualification ?? '',
          district: userData?.district ?? '',
          phone_no: userData?.phone_no ?? '',
          service_type: userData?.service_type ?? '',
          latitude: userData?.latitude ?? '',
          longitude: userData?.longitude ?? '',
        });
        setSelectedDistrict(userData?.district ?? '');
      } else if (user?.userType === 'customer') {
        setProfile({
          name: userData?.name ?? '',
          email: userData?.email ?? '',
          phone: userData?.phone ?? '',
        });
      }
    },
  });

  const { mutate: updateLocation } = useGenericMutation<
    unknown,
    unknown,
    { latitude: string; longitude: string }
  >(updateLocationSP, {
    onSuccess: () => {
      mutate();
      showToast({
        variant: 'success',
        message: 'Location updated successfully',
      });
    },
  });

  const { mutate: updateSP } = useGenericMutation<
    ServiceProviderDetails,
    unknown,
    ServiceProviderDetails
  >(updateServiceProvider, {
    onSuccess: () => {
      showToast({
        variant: 'success',
        message: 'Profile updated successfully',
      });
    },
  });

  const { mutate: updateCus } = useGenericMutation<
    ServiceProviderDetails,
    unknown,
    ServiceProviderDetails
  >(updateCustomer, {
    onSuccess: () => {
      showToast({
        variant: 'success',
        message: 'Profile updated successfully',
      });
    },
  });

  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    mutate();
  }, [mutate, user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
  };

  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setProfile((prevProfile) => ({ ...prevProfile, district, city: '' }));
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    setUserData(null);
    navigate('/');
  };

  const handleSubmit = async () => {
    const userDetails = profile as unknown as ServiceProviderDetails;
    if (user?.userType === 'service_provider') {
      updateSP({
        ...userDetails,
        user_id: user.user_id,
      });
    } else if (user?.userType === 'customer') {
      updateCus({
        ...userDetails,
        user_id: user.user_id,
      });
    }
  };

  const updadeLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        updateLocation({
          latitude: String(latitude),
          longitude: String(longitude),
        });
      });
    } else {
      showToast({
        variant: 'error',
        message: 'Geolocation is not supported by this browser.',
      });
    }
  };

  return (
    <div className='profile-page'>
      <div className='content'>
        <div className='content__cover'>
          <img
            className='content__avatar'
            id='profilePhoto'
            src='https://cdn-icons-png.flaticon.com/512/4715/4715329.png'
            alt='Profile Photo'
          />
          <div className='content__bull'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className='details'>
          {inputFields.map((field) => (
            <p key={field.id}>
              {field.label}:<span id={field.id}></span>
              <input
                type={field.type}
                id={field.id}
                value={profile[field.id] ?? ''}
                onChange={handleChange}
                className='input-field'
              />
            </p>
          ))}
          {user?.userType === 'service_provider' && (
            <>
              <p>
                Service Type:
                <select
                  id='service_type'
                  value={profile.service_type}
                  onChange={handleChange}
                  className='input-field'
                >
                  <option value=''>Select ServiceType</option>
                  {servicesData?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                District:
                <select
                  id='district'
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className='input-field'
                >
                  <option value=''>Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                City:
                <select
                  id='city'
                  value={profile.city}
                  onChange={handleChange}
                  className='input-field'
                >
                  <option value=''>Select City</option>
                  {cities[selectedDistrict]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <div>
                  Current Location:
                  <div>
                    Lat-{profile.latitude}
                    <br />
                    Long-{profile.longitude}
                  </div>
                </div>
                <button className='button' onClick={updadeLocation}>
                  <div className='button__border'></div>
                  <div className='button__bg'></div>
                  <p className='button__text'>Update Location</p>
                </button>
              </p>
            </>
          )}
        </div>

        <div id='serviceProvidersList'></div>

        <ul className='content__list' id='profileDetails'></ul>
        <div className='content__button'>
          <button className='button' onClick={handleSubmit}>
            <div className='button__border'></div>
            <div className='button__bg'></div>
            <p className='button__text'>Submit</p>
          </button>
          <button className='button' onClick={signOut} id='sign-out-link'>
            <div className='button__border'></div>
            <div className='button__bg'></div>
            <p className='button__text'>Sign-out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
