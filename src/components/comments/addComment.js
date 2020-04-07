import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'reactstrap';
import { GlobalContext } from '../../context/GlobalContext';
import { getUserID } from '../../utils/helper';
import API from '../../api/api';
import Notification from '../../utils/notification';
import { NotificationContainer } from 'react-notifications';

export const AddComment = ({ resourceId }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const { state, updateComment } = useContext(GlobalContext);

  const onSubmit = (data) => {
    const { text } = data;
    const userId = getUserID(state);
    const comment = {
      text,
      resourceId,
      userId,
    };
    API.addComment(comment)
      .then((comment) => {
        updateComment(comment);
        reset();
      })
      .catch((error) => {
        if (!error.data.loggedIn) {
          Notification(
            'error',
            'Your Account Was Suspensed By Admin.',
            'Suspended',
            '1500'
          );
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      });
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className='col col-lg-12 col-xl-12 p-0'
    >
      <NotificationContainer />
      <div className='form-group'>
        <input
          name='text'
          ref={register({ required: true })}
          className='form-control bg-white'
          placeholder='Comment Here...'
        />
        {errors.text && <span>Please Enter the Comment.</span>}
      </div>
    </Form>
  );
};
