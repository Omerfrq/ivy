import React, { useState, useContext } from 'react';
import date from '../../utils/date';
import axios from 'axios';
import { Form, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../context/GlobalContext';
import { ReplyItem } from './replyItem';

const defaultImage =
  'https://images.macrumors.com/t/XjzsIpBxeGphVqiWDqCzjDgY4Ck=/800x0/article-new/2019/04/guest-user-250x250.jpg';
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
    <div class='flex-column flex-lg-row py-5 row text-center text-lg-left custom-border-y'>
      <div class='col col-lg-1 mb-3 mb-lg-0'>
        <img
          class='custom-user-pic rounded-circle custom-shadow-box'
          src={imageUrl || defaultImage}
          alt='user'
        />
      </div>
      <div class='col col-lg-8 col-xl-7 mb-3 mb-lg-0'>
        <div class='d-flex justify-content-between h4 font-weight-normal text-muted text-capitalize'>
          <span>{name}</span>
          <div
            onClick={() => {
              remove(comment._id);
            }}
            class='badge badge-danger border-0 btn cursor-pointer font-weight-bold mr-2'
          >
            Delete
          </div>
          <div
            onClick={() => {
              setReply(true);
            }}
            class='badge badge-danger border-0 btn cursor-pointer font-weight-bold mr-2'
          >
            Reply
          </div>
        </div>
        <div class='text-justify '>{text}</div>
      </div>
      <div class='h4 col col-xl-2 col-xl-3 '>{date.fromNow(createdAt)}</div>
      <div class='col-md-12 mt-2'>
        <div class='col-md-12'>
          <div class='row'>
            <div className='col-md-1'></div>
            <div class='col-md-9 p-0'>
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
        <div className='col-md-12 mt-2'>
          <div className='row'>
            <div className=' col-md-2'></div>
            <div className='col p-0'>
              <div className='row'>
                <div className=' d-flex align-items-center p-0 mr-2 ml-2'>
                  <div className='reply-img'>
                    <img
                      className='h-100 w-100'
                      src={imageUrl || defaultImage}
                      alt=''
                    />
                  </div>
                </div>
                <div className='col-md-7'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      type='text'
                      placeholder='Enter A Reply...'
                      name='text'
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
