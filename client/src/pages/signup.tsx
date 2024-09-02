import { useMutation } from 'react-query';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import React from 'react';
import { showToast } from '../component/ui/toast';

const SignUpPage = () => {
  const navigation = useNavigate();

  const { mutate } = useMutation(signup, {
    onSuccess: () => {
      showToast({ variant: 'success', message: 'Sign up successful' });
      navigation('/sign-in');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      const msg = err.response.data.error;
      showToast({ variant: 'error', message: msg ?? 'Sign up failed' });
    },
  });

  const signInHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
      password: HTMLInputElement;
      userType: HTMLSelectElement;
    };

    const formData = {
      name: formElements.name.value,
      email: formElements.email.value,
      password: formElements.password.value,
      userType: formElements.userType.value,
    };

    mutate(formData);
  };

  return (
    <div className={styles.main}>
      <section className={styles.container}>
        <header className={styles.header}>
          Sign-up
          <br />
          <p className={styles.links}>
            <Link to='/'>Home</Link>/<Link to='/sign-in'>Sign-in</Link>
          </p>
        </header>
        <form id='signup-form' className={styles.form} onSubmit={signInHandler}>
          <div className={styles.inputBox}>
            <label htmlFor='fullname'>Full Name</label>
            <input
              name='name'
              type='text'
              id='fullname'
              placeholder='Enter full name'
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor='email'>Email Address</label>
            <input
              name='email'
              type='email'
              id='email'
              placeholder='Enter email address'
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              id='password'
              placeholder='Enter password'
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor='role'>
              Are you a customer or service provider?
            </label>
            <select
              id='role'
              required
              className={styles.selectBox}
              name='userType'
            >
              <option value='' hidden>
                Please select
              </option>
              <option value='customer'>Customer</option>
              <option value='service_provider'>Service Provider</option>
            </select>
          </div>

          <button type='submit' id='signUp' className={styles.button}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignUpPage;
