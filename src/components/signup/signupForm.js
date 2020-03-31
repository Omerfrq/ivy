import React, { useState } from 'react';
import { FormGroup, Input, Form, Alert, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Placeholder } from '../form/placeholder';
import { usePlaceHolder } from '../hooks/usePlaceholder';
import axios from 'axios';
import { NotificationContainer } from 'react-notifications';
import Notification from '../../utils/notification';
import { Link } from 'react-router-dom';

export const SignupForm = () => {
  const { register, errors, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const {
    placeholder,
    file,
    inputFile,
    onChange,
    onImageClick,
    resetPlaceholder
  } = usePlaceHolder();

  const onSubmit = data => {
    setIsLoading(true);
    const { name, username, gender, email, password } = data;
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('userName', username);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('gender', gender);
    formdata.append('imageUrl', file);

    axios
      .post('/signup', formdata)
      .then(res => {
        setIsLoading(false);
        setSuccess(res.data.Message);
        setTimeout(() => {
          setSuccess('');
        }, 3000);
        reset();
        setError('');
        resetPlaceholder();
      })
      .catch(err => {
        setIsLoading(false);
        Notification('error', err.response.data.message, 'Failed', 1000);
      });
  };

  return (
    <>
      <div className='d-flex flex-column col-md-9'>
        <NotificationContainer />
        <h3 class='font-weight-bold text-dark '>Welcome to IVY Nemesis.</h3>
        <hr class='bg-dark p-0 my-1' />
        <p class='text-muted mb-0'>
          Let's all get set up so we can get Started.
        </p>
        <div className='d-flex justify-content-center align-items-center mb-3'>
          <Placeholder
            placeholder={placeholder}
            onImageClick={onImageClick}
            inputFile={inputFile}
            onChange={onChange}
            height='signup-placeholder'
          />
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Alert className='alert alert-danger mt-3 font-weight-bold'>
              {error.message}
            </Alert>
          )}
          {success && (
            <Alert className='alert alert-success mt-3 font-weight-bold'>
              {success}
            </Alert>
          )}
          <div className='col-md-12 p-0'>
            <div className='row'>
              <div className='col-md-6'>
                <FormGroup>
                  <Input
                    type='text'
                    name='name'
                    className='bg-transparent'
                    placeholder='Enter Name.'
                    innerRef={register({ required: true })}
                  />
                  {errors.name && (
                    <span className='font-weight-bold small text-danger'>
                      * Name is Required.
                    </span>
                  )}
                </FormGroup>
              </div>
              <div className='col-md-6'>
                <FormGroup>
                  <Input
                    type='text'
                    name='username'
                    placeholder='Enter Username'
                    className='bg-transparent'
                    innerRef={register({ required: true })}
                  />
                  {errors.username && (
                    <span className='font-weight-bold small text-danger'>
                      * Username is Required.
                    </span>
                  )}
                </FormGroup>
              </div>
            </div>
          </div>

          <FormGroup>
            <Input
              type='select'
              className='bg-transparent mb-2'
              name='gender'
              defaultValue={''}
              innerRef={register({ required: true })}
            >
              <option disabled>Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </Input>
            {errors.gender && <span>No Gender Selected</span>}
          </FormGroup>

          <FormGroup>
            <Input
              type='email'
              name='email'
              className='bg-transparent'
              placeholder='Enter Email'
              innerRef={register({ required: true })}
            />
            <small class='form-text text-muted mb-1'>
              We'll never share your email with anyone.
            </small>
            {errors.email && (
              <span className='font-weight-bold small text-danger'>
                * Email is Required.
              </span>
            )}
          </FormGroup>
          <FormGroup>
            <Input
              type='password'
              name='password'
              className='bg-transparent'
              placeholder='Enter Your Password'
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
              className={
                isLoading ? 'mr-2 spinner-border spinner-border-sm' : ''
              }
              role='status'
              aria-hidden='true'
            ></span>
            {isLoading ? 'Loading...' : 'Signup'}
          </Button>
          <p class='text-center mt-2'>
            <span> Already A Member ? </span>
            <span class='font-weight-bold'>
              {' '}
              <Link to='/'>Signin</Link>{' '}
            </span>
          </p>
        </Form>
      </div>
    </>
  );
};
