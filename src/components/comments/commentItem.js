import React, { useState, useContext } from 'react';
import date from '../../utils/date';
import axios from 'axios';
import { Form, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../context/GlobalContext';
import { ReplyItem } from './replyItem';

const defaultImage =
  'https://www.flaticon.com/premium-icon/icons/svg/1993/1993420.svg';
export const CommentItem = ({ comment }) => {
  const { imageUrl, name } = comment.userId;
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
        userId
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
    <div class='flex-column border-bottom flex-lg-row pt-2 row text-center text-lg-left custom-border-y'>
      <div class='col col-lg-1 mb-3 mb-lg-0'>
        <img
          class='custom-user-pic rounded-circle shadow-sm'
          src={imageUrl || defaultImage}
          alt='user'
        />
      </div>
      <div class='col col-lg-8 col-xl-8 mb-3 mb-lg-0 p-0'>
        <div class='d-flex justify-content-between align-items-end h6 mb-0 font-weight-normal text-muted text-capitalize'>
          <span className='text-capitalize font-weight-bold text-dark'>
            {name}
          </span>
          <div className='d-flex align-items-end'>
            <div>
              <i
                onClick={() => {
                  setReply(true);
                }}
                class='fas fa-reply cursor-pointer text-info small mr-2'
              ></i>
            </div>
            <div>
              <i
                onClick={() => {
                  remove(comment._id);
                }}
                class='fas fa-trash-alt small text-danger cursor-pointer'
              ></i>
            </div>
            <div class='small ml-2 bg-dark text-white  px-2'>
              {date.fromNow(createdAt)}
            </div>
          </div>
        </div>
        <div class='text-justify '>{text}</div>
      </div>
      <div class='col-md-12 mt-2'>
        <div class='col-md-12'>
          <div class='row'>
            <div className='col-md-1 col-lg-1'></div>
            <div class='col-md-9 col-xl-8 p-0'>
              {replies.map(reply => (
                <ReplyItem
                  key={reply._id}
                  img={reply.userId.imageUrl}
                  name={reply.userId.name}
                  time={reply.createdAt}
                  text={reply.text}
                />
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
