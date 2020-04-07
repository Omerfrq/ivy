import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';
import { TopImageCommentList } from './topImageCommentList';
import { ASSETS } from '../../config/assetConfig';

import Notification from '../../utils/notification';
import { NotificationContainer } from 'react-notifications';
export const GalleryItem = ({ item }) => {
  const history = useHistory();
  const {
    upvoteCount,
    title,
    topComments,
    downvoteCount,
    userVoteStatus,
    _id,
    postBy,
  } = item;

  const [upvote, setUpVote] = useState(userVoteStatus.upvote || false);
  const [UpvoteCount, setUpVoteCount] = useState(upvoteCount);
  const [downvote, setDownVote] = useState(userVoteStatus.downvote || false);
  const [DownvoteCount, setDownVoteCount] = useState(downvoteCount);
  const { state } = useContext(GlobalContext);

  const userId = state.type === 'guest' ? state.guest._id : state.user._id;

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
    setUpVote(!upvote);
    if (upvote) {
      setUpVoteCount(UpvoteCount - 1);
    } else if (!upvote && downvote) {
      setDownVote(false);
      setDownVoteCount(DownvoteCount - 1);
      setUpVoteCount(UpvoteCount + 1);
    } else if (!upvote) {
      setUpVoteCount(UpvoteCount + 1);
    }
    reaction(type);
  };

  const downVote = (type) => {
    setDownVote(!downvote);
    downvote
      ? setDownVoteCount(DownvoteCount - 1)
      : setDownVoteCount(DownvoteCount + 1);

    if (downvote) {
      setDownVoteCount(DownvoteCount - 1);
    } else if (upvote && !downvote) {
      setUpVote(false);
      setUpVoteCount(UpvoteCount - 1);
      setDownVoteCount(DownvoteCount + 1);
    } else if (!downvote) {
      setDownVoteCount(DownvoteCount + 1);
    }
    reaction(type);
  };

  return (
    <li className='border-0  item p-0  location-listing' type='button'>
      <NotificationContainer />
      <div className='location-image mb-5 h-100'>
        <img
          className={`h-100 w-100 custom-rounded-1rem  ${item.filter}`}
          src={item.mediaUrl}
          alt='pic'
        />
      </div>
      <div className='location-title row mx-0'>
        <div
          onClick={() => {
            history.push(`/${item._id}`);
          }}
          className='col-md-11 mx-auto w-100 h-90 overflow-hidden'
        >
          <div className='text-right'>
            <div>
              <img
                className='custom-user-pic-small rounded-circle'
                src={postBy?.imageUrl || ASSETS.defaultImg}
                alt={postBy?.name}
              />
            </div>
            <div className='h6 mb-1'>
              <span className='small font-weight-bold text-capitalize'>
                {title}
              </span>
            </div>
          </div>
          <TopImageCommentList comments={topComments} />
        </div>
        <div className='align-items-center h-10 p-1 bg-muted custom-radius-bottom shadow-lg bg-muted d-flex justify-content-around w-100 border-top  custom-font-size-small'>
          <div className='d-flex align-items-center text-dark'>
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
              data-original-title='I like this'
            >
              <i className='far fa-thumbs-up '></i>
            </div>
            <span className='badge badge-pill badge-light ml-1'>
              {UpvoteCount}
            </span>
          </div>
          <div className='d-flex align-items-center text-light'>
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
              data-original-title='I dislike this'
            >
              <i className='far fa-thumbs-down '></i>
            </div>
            <span className='badge badge-pill badge-light ml-1'>
              {DownvoteCount}
            </span>
          </div>
          <div
            onClick={() => {
              history.push(`/${item._id}`);
            }}
            className='btn-sm btn-outline-light rounded-circle'
            type='button'
            data-toggle='tooltip'
            data-placement='top'
            title=''
            data-original-title='Comment Here'
          >
            <i className='far fa-comment' aria-hidden='true'></i>
          </div>
        </div>
      </div>
    </li>
  );
};
