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
    <Form onSubmit={handleSubmit(onSubmit)} class='col col-lg-10 col-xl-9 py-5'>
      <div class='pt-4'>
        <textarea
          name='text'
          ref={register({ required: true })}
          class='w-100 custom-rounded-1rem bg-white pt-4 pl-4'
          rows='10'
          placeholder='Comment Here...'
        ></textarea>
        {errors.text && <span>Please Enter the Comment.</span>}
      </div>
      <div class='text-right'>
        <button class='btn btn-success mb-2' type='submit'>
          Comment
        </button>
      </div>
    </Form>
  );
};
