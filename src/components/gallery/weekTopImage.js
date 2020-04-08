import React, { useContext } from 'react';
import { TopImageCommentList } from './topImageCommentList';
import { GlobalContext } from '../../context/GlobalContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getUserID } from '../../utils/helper';
import { useImmerReducer } from 'use-immer';
import { voteReducer } from '../reducer/voteReducer';

import Notification from '../../utils/notification';
import { NotificationContainer } from 'react-notifications';

export const WeekTopImage = ({ topImage }) => {
  const { state } = useContext(GlobalContext);

  const {
    topComments,
    downvoteCount,
    userVoteStatus,
    mediaUrl,
    _id,
    title,
    filter,
  } = topImage;
  const initialState = {
    upvote: userVoteStatus.upvote,
    UpvoteCount: topImage.upvoteCount,
    downvote: userVoteStatus.downvote,
    DownvoteCount: downvoteCount,
  };
  const [localState, dispatch] = useImmerReducer(voteReducer, initialState);
  const { upvote, UpvoteCount, downvote, DownvoteCount } = localState;

  const history = useHistory();
  const userId = getUserID(state);

  const reaction = (type) => {
    const payload = {
      resourceId: _id,
      vote: {
        userId,
        type,
      },
    };
    axios
      .patch('/vote', payload)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        if (!err.response.data.loggedIn) {
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

  const vote = (type) => {
    dispatch({ type: 'upvote' });
    reaction(type);
  };

  const downVote = (type) => {
    dispatch({ type: 'downvote' });
    reaction(type);
  };

  return (
    <div className='location-listing'>
      <NotificationContainer />
      <div className='location-title  mx-0 row'>
        <div
          onClick={() => {
            history.push(`/${_id}`);
          }}
          className='align-items-center align-items-md-end custom-scroll-none d-flex flex-column h-90 justify-content-center justify-content-md-end mr-lg-5 mr-md-3 overflow-auto section-comment w-100'
        >
          <div className='section-comment__user text-center'>
            <div>
              <img
                className='custom-shadow-box custom-user-pic-small rounded-circle'
                src={mediaUrl}
                alt={title}
              />
            </div>
            <div className='h6 mb-1'>
              <span className='small font-weight-bold text-capitalize'>
                {title}
              </span>
            </div>
          </div>
          <div className='col-md-3 p-0'>
            <TopImageCommentList comments={topComments} />
          </div>
        </div>

        <div className='align-items-center border-top custom-font-size-small d-flex justify-content-around py-xl-2 w-100'>
          <div className='align-items-center d-flex'>
            <div
              onClick={() => {
                vote('upvote');
              }}
              className={`btn-sm btn-outline-light rounded-circle ${
                upvote ? 'bg-white text-dark' : ''
              }`}
              type='button'
              data-toggle='tooltip'
              data-placement='top'
              title=''
              data-original-title='I like this'
            >
              <i className='far fa-thumbs-up' aria-hidden='true'></i>
            </div>
            <span className='badge badge-pill badge-light ml-1'>
              {UpvoteCount}
            </span>
          </div>
          <div className='align-items-center d-flex'>
            <div
              onClick={() => {
                downVote('downvote');
              }}
              className={`btn-sm btn-outline-light rounded-circle ${
                downvote ? 'bg-white text-dark' : ''
              }`}
              type='button'
              data-toggle='tooltip'
              data-placement='top'
              title=''
              data-original-title='I dislike this'
            >
              <i className='far fa-thumbs-down' aria-hidden='true'></i>
            </div>
            <span className='badge badge-pill badge-light ml-1'>
              {DownvoteCount}
            </span>
          </div>
          <div
            onClick={() => {
              history.push(`/${_id}`);
            }}
            className='btn-sm btn-outline-light rounded-circle'
            type='button'
            data-toggle='tooltip'
            data-placement='top'
            title=''
            data-original-title='Leave a comment'
          >
            <i className='far fa-comment' aria-hidden='true'></i>
          </div>
        </div>
      </div>

      <div className='position-relative location-image h-100vh'>
        <img
          className={`custom-rounded-1rem hero-background h-100 ${filter}`}
          src={mediaUrl}
          alt='Pic'
        />
      </div>
    </div>
  );
};
