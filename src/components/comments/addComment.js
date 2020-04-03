import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'reactstrap';
import { GlobalContext } from '../../context/GlobalContext';
import axios from 'axios';
import { getUserID } from '../../utils/helper';

export const AddComment = ({ resourceId }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const { state, updateComment } = useContext(GlobalContext);

  const onSubmit = data => {
    const { text } = data;
    const userId = getUserID(state);
    const payload = {
      text,
      resourceId,
      userId
    };

    axios
      .post('/comment/add', payload)
      .then(res => {
        updateComment(res.data.savedComment);
        reset();
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className='col col-lg-12 col-xl-12 p-0'
    >
      <div className='form-group'>
        <input
          name='text'
          ref={register({ required: true })}
          className=' form-control bg-white'
          placeholder='Comment Here...'
        />
        {errors.text && <span>Please Enter the Comment.</span>}
      </div>
    </Form>
  );
};
