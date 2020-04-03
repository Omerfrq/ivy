import React, { useContext, useState } from 'react';
import { TopImageCommentList } from './topImageCommentList';
import { GlobalContext } from '../../context/GlobalContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getUserID } from '../../utils/helper';
export const WeekTopImage = ({ topImage }) => {
  const { state } = useContext(GlobalContext);
  const {
    upvoteCount,
    topComments,
    downvoteCount,
    userVoteStatus,
    mediaUrl,
    _id,
    filter
  } = topImage;

  const history = useHistory();
  const [upvote, setUpVote] = useState(userVoteStatus.upvote || false);
  const [UpvoteCount, setUpVoteCount] = useState(upvoteCount);
  const [downvote, setDownVote] = useState(userVoteStatus.downvote || false);
  const [DownvoteCount, setDownVoteCount] = useState(downvoteCount);

  const userId = getUserID(state);

  const reaction = type => {
    const payload = {
      resourceId: _id,
      vote: {
        userId,
        type
      }
    };
    axios
      .patch('/vote', payload)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err.response));
  };

  const vote = type => {
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

  const downVote = type => {
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
    <div className='location-listing'>
      <div className='location-title  mx-0 row'>
        <div className='align-items-center align-items-md-end custom-scroll-none d-flex flex-column h-75 justify-content-center justify-content-md-end mr-lg-5 mr-md-3 overflow-auto section-comment w-100'>
          <div className='section-comment__user text-center'>
            <div>
              <img
                className='custom-shadow-box custom-user-pic-small rounded-circle'
                src={mediaUrl}
                alt='user'
              />
            </div>
            <div className='h6 mb-1'>
              <span className='small font-weight-bold text-capitalize'>
                Jenna
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
              className={`btn-sm btn-outline-light rounded-circle ${
                upvote ? 'bg-white text-dark' : ''
              }`}
              type='button'
              data-toggle='tooltip'
              data-placement='top'
              title=''
              data-original-title='I like this'
            >
              <i
                onClick={() => {
                  vote('upvote');
                }}
                className='far fa-thumbs-up'
                aria-hidden='true'
              ></i>
            </div>
            <span className='badge badge-pill badge-light ml-1'>
              {UpvoteCount}
            </span>
          </div>
          <div className='align-items-center d-flex'>
            <div
              className={`btn-sm btn-outline-light rounded-circle ${
                downvote ? 'bg-white text-dark' : ''
              }`}
              type='button'
              data-toggle='tooltip'
              data-placement='top'
              title=''
              data-original-title='I dislike this'
            >
              <i
                onClick={() => {
                  downVote('downvote');
                }}
                className='far fa-thumbs-down'
                aria-hidden='true'
              ></i>
            </div>
            <span className='badge badge-pill badge-light ml-1'>
              {DownvoteCount}
            </span>
          </div>
          <div
            className='btn-sm btn-outline-light rounded-circle'
            type='button'
            data-toggle='tooltip'
            data-placement='top'
            title=''
            data-original-title='Leave a comment'
          >
            <i
              onClick={() => {
                history.push(`/${_id}`);
              }}
              className='far fa-comment'
              aria-hidden='true'
            ></i>
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
