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
    <Form onSubmit={handleSubmit(onSubmit)} class='col col-lg-8 col-xl-8'>
      <div class='form-group'>
        <input
          name='text'
          ref={register({ required: true })}
          class=' form-control'
          placeholder='Comment Here...'
        />
        {errors.text && <span>Please Enter the Comment.</span>}
      </div>
    </Form>
  );
};
