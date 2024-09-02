/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { showToast } from '../component/ui/toast';
import { login } from '../api/auth';
import { useGenericMutation } from '../hooks/useMutation';
import { useAuthStore } from '../store/auth';
interface LoginResponse {
  token: string;
}

interface LoginVariables {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { setAuthenticated, setLoading } = useAuthStore((state) => state);
  const { mutate } = useGenericMutation<LoginResponse, unknown, LoginVariables>(
    login,
    {
      onSuccess: (data) => {
        const token = data.data.token;
        localStorage.setItem('token', token);
        showToast({ variant: 'success', message: 'Sign in successful' });
        setAuthenticated(true);
        setLoading(false);
        window.location.href = '/';
      },
      onError: (err: any) => {
        const msg = err.response.data.error;
        showToast({ variant: 'error', message: msg ?? 'Sign in failed' });
      },
    }
  );

  const signInHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    const formData = {
      email: formElements.email.value,
      password: formElements.password.value,
    };

    mutate(formData);
  };
  return (
    <div className={styles.main}>
      <section className={styles.container}>
        <header className={styles.header}>
          Sign-In
          <br />
          <p className={styles.links}>
            <Link to='/'>Home</Link>
            <br />
            <Link to='/sign-up'>
              Not signed up? Please click here to sign up.
            </Link>
          </p>
        </header>
        <form id='signin-form' className={styles.form} onSubmit={signInHandler}>
          <div className={styles.inputBox}>
            <label htmlFor='email'>Email Address</label>
            <input
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
              type='password'
              id='password'
              placeholder='Enter password'
              required
              className={styles.input}
            />
          </div>

          <button type='submit' id='signin' className={styles.button}>
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
