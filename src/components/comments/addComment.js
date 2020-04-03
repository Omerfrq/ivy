import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'reactstrap';
import { GlobalContext } from '../../context/GlobalContext';
import { getUserID } from '../../utils/helper';
import API from '../../api/api';

export const AddComment = ({ resourceId }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const { state, updateComment } = useContext(GlobalContext);

  const onSubmit = data => {
    const { text } = data;
    const userId = getUserID(state);
    const comment = {
      text,
      resourceId,
      userId
    };
    API.addComment(comment)
      .then(comment => {
        updateComment(comment);
        reset();
      })
      .catch(error => console.log(error));
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
          className='form-control bg-white'
          placeholder='Comment Here...'
        />
        {errors.text && <span>Please Enter the Comment.</span>}
      </div>
    </Form>
  );
};
