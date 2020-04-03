import React, { useState, useContext } from 'react';
import date from '../../utils/date';
import axios from 'axios';
import { Form, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../context/GlobalContext';
import { ReplyItem } from './replyItem';
import { getUserID } from '../../utils/helper';

const defaultImage =
  'https://www.flaticon.com/premium-icon/icons/svg/1993/1993420.svg';
export const CommentItem = ({ comment }) => {
  const { imageUrl, name, _id } = comment.userId;
  const { text, createdAt, replies } = comment;
  const [reply, setReply] = useState(false);
  const { register, errors, handleSubmit, reset } = useForm();
  const { state, updateReply, removeComment } = useContext(GlobalContext);

  const remove = commentId => {
    axios
      .delete(`/comment/delete/${commentId}`)
      .then(res => removeComment(commentId))
      .catch(err => console.log(err.response));
  };

  const onSubmit = data => {
    const userId = state.type === 'guest' ? state.guest.id : state.user._id;
    const { text } = data;
    const payload = {
      commentId: comment._id,
      reply: {
        text,
        userId,
        createdAt: Date.now()
      }
    };
    axios
      .patch('/comment/reply/add', payload)
      .then(res => {
        updateReply(res.data.savedReply, comment._id);
        reset();
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className='flex-column m-0 mb-4 shadow-sm border-collapse flex-lg-row col-xl-11 col-sm-12 pt-2 row text-center text-lg-left '>
      <div className='col col-lg-1 mb-3 mb-lg-0'>
        <img
          className='custom-user-pic-small rounded-circle shadow-sm'
          src={imageUrl || defaultImage}
          alt='user'
        />
      </div>
      <div className='col col-lg-8 col-xl-11 mb-lg-0 p-0'>
        <div className='d-flex justify-content-between align-items-end h6 mb-0 font-weight-normal text-muted text-capitalize'>
          <span className='text-capitalize font-weight-bold text-dark'>
            {name}
          </span>
          <div className='d-flex align-items-end'>
            <div>
              <i
                onClick={() => {
                  setReply(true);
                }}
                className='fas fa-reply cursor-pointer text-info small mr-2'
              ></i>
            </div>
            {getUserID(state) === _id ? (
              <div>
                <i
                  onClick={() => {
                    remove(comment._id);
                  }}
                  className='fas fa-trash-alt small text-danger cursor-pointer'
                ></i>
              </div>
            ) : (
              ''
            )}

            <div className='small ml-2'>{date.fromNow(createdAt)}</div>
          </div>
        </div>
        <div className='text-justify '>{text}</div>
      </div>
      <div className='col-md-12 mt-2'>
        <div className='col-md-12'>
          <div className='row'>
            <div className='col-md-1 col-lg-1'></div>
            <div className='col-md-9 col-xl-10 p-0'>
              {replies.map(reply => (
                <ReplyItem key={reply._id} reply={reply} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {reply ? (
        <div className='col-md-12 mt-2 mb-2'>
          <div className='row'>
            <div className='col-lg-1 col-md-2'></div>
            <div className='col-md-10 col-xl-8 p-0'>
              <div className='row'>
                <div className=' d-flex align-items-center p-0 mr-2 ml-2'>
                  <div className='reply-img'>
                    <img
                      className='h-100 w-100 border-circle'
                      src={imageUrl || defaultImage}
                      alt=''
                    />
                  </div>
                </div>
                <div className='col p-0'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      type='text'
                      placeholder='Enter A Reply...'
                      name='text'
                      className='bg-white'
                      innerRef={register({ required: true })}
                    />
                    {errors.text && <span>Please Enter A Reply..</span>}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
