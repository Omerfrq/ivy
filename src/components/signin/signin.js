import React, { useState, useContext } from 'react';
import { FormGroup, Input, Form, Button, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';

import { NotificationContainer } from 'react-notifications';
import Notification from '../../utils/notification';
import { Link } from 'react-router-dom';
import { useGuestSignup } from '../hooks/useGuest';

export const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, errors, handleSubmit, reset } = useForm();
  const { login } = useContext(GlobalContext);

  const { loginGuest } = useGuestSignup();

  const onSubmit = data => {
    setIsLoading(true);
    axios
      .post('/signin', data)
      .then(res => {
        Notification('success', 'User Loggedin Successfully.', 'Success', 1000);
        setTimeout(() => {
          login(res.data.token);
        }, 1200);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        Notification('error', err.response.data.message, 'Failed', 1000);
      });
  };
  return (
    <div className='col-md-8'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <NotificationContainer />
        <FormGroup>
          <Label>Enter Email</Label>
          <Input
            className='bg-transparent'
            name='email'
            type='text'
            innerRef={register({ required: true })}
            placeholder='Email'
          />
          {errors.email && (
            <span className='font-weight-bold small text-danger'>
              * Email is Required.
            </span>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Enter Password</Label>
          <Input
            name='password'
            className='bg-transparent'
            type='password'
            placeholder='Password'
            innerRef={register({ required: true })}
          />
          {errors.password && (
            <span className='font-weight-bold small text-danger'>
              * Password is Required.
            </span>
          )}
        </FormGroup>
        <Button
          type='submit'
          className='btn btn-block btn-dark mb-2'
          disabled={isLoading}
        >
          <span
            className={isLoading ? 'mr-2 spinner-border spinner-border-sm' : ''}
            role='status'
            aria-hidden='true'
          ></span>
          {isLoading ? 'Loading...' : 'Signin'}
        </Button>
        <p class='text-center mt-2'>
          <span> Already A Member ? </span>
          <span class='font-weight-bold'>
            {' '}
            <Link to='/signup'>Signup</Link>{' '}
          </span>
        </p>
        <div></div>
      </Form>
      <Button
        onClick={() => {
          loginGuest();
        }}
      >
        Continue as Guest
      </Button>
    </div>
  );
};
