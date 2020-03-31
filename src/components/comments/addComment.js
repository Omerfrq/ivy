import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'reactstrap';
import { GlobalContext } from '../../context/GlobalContext';
import axios from 'axios';

export const AddComment = ({ resourceId }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const { state, updateComment } = useContext(GlobalContext);

  const onSubmit = data => {
    const { text } = data;
    const userId = state.type === 'guest' ? state.guest.id : state.user._id;
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
      <div class='pb-4'>Add your comments...</div>
      <div class='pb-4'>
        <textarea
          name='text'
          ref={register({ required: true })}
          class='w-100 custom-rounded-2rem border-white custom-shadow pt-4 pl-4'
          rows='10'
        ></textarea>
        {errors.text && <span>Please Enter the Comment.</span>}
      </div>
      <div class='text-right'>
        <button
          class='btn text-uppercase myButton rounded-pill font-weight-bold'
          type='submit'
        >
          Submit
        </button>
      </div>
    </Form>
  );
};
