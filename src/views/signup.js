import React from 'react';
import { SignupForm } from '../components/signup/signupForm';
import { useRedirect } from '../components/hooks/useRedirect';

export const Signup = () => {
  useRedirect();
  return (
    <div className='d-flex height-100vh'>
      <div className='col-md-6 sm-d-none d-flex justify-content-center align-items-center'>
        <img src='https://i.imgur.com/A2WXIRB.jpg' alt='' />
      </div>
      <div className='col-md-5 d-flex height-100vh justify-content-center align-items-center'>
        <SignupForm />
      </div>
    </div>
  );
};
