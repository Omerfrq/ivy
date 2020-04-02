import React from 'react';
import { SigninForm } from '../components/signin/signin';
import { useRedirect } from '../components/hooks/useRedirect';

export const SignIn = () => {
  useRedirect();
  return (
    <div className='d-flex height-100vh-all flex-column-sm'>
      <div className='col-md-6 d-flex justify-content-center align-items-center p-0'>
        <img
          className=' w-100'
          src='https://i.imgur.com/c7vzq9G.png'
          alt='signin'
        />
      </div>
      <div className='col-md-5 p-0 d-flex height-100vh justify-content-center align-items-center'>
        <SigninForm />
      </div>
    </div>
  );
};
