import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';
import { TopImageCommentList } from './topImageCommentList';
export const GalleryItem = ({ item }) => {
  const history = useHistory();
  const { upvoteCount, topComments, downvoteCount, userVoteStatus, _id } = item;
  const [upvote, setUpVote] = useState(userVoteStatus.upvote || false);
  const [UpvoteCount, setUpVoteCount] = useState(upvoteCount);
  const [downvote, setDownVote] = useState(userVoteStatus.downvote || false);
  const [DownvoteCount, setDownVoteCount] = useState(downvoteCount);
  const { state } = useContext(GlobalContext);

  const userId = state.type === 'guest' ? state.guest.id : state.user._id;

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
    <li className='border-0 item p-0  location-listing' type='button'>
      <div className='custom-rounded-2rem location-image h-100'>
        <img
          className={`h-100 w-100 ${item.filter}`}
          src={item.mediaUrl}
          alt='pic'
        />
      </div>
      <div class='location-title row mx-0'>
        <div class='col-md-11 mx-auto w-100 h-75 overflow-auto custom-scroll-none'>
          <div class='text-right'>
            <div>
              <img
                class='custom-user-pic-small rounded-circle'
                src={item.mediaUrl}
                alt='user'
              />
            </div>
            <div class='h6 mb-1'>
              <span class='small font-weight-bold text-capitalize'>Jenna</span>
            </div>
          </div>
          <TopImageCommentList comments={topComments} />
        </div>
        <div class='align-items-center d-flex justify-content-around w-100 border-top py-2 custom-font-size-small'>
          <div class='d-flex align-items-center'>
            <div
              class={`btn-sm btn-outline-light rounded-circle ${
                upvote ? 'bg-white text-dark' : ''
              }`}
              type='button'
              data-toggle='tooltip'
              data-placement='top'
              data-original-title='I like this'
            >
              <i
                onClick={() => {
                  vote('upvote');
                }}
                class='far fa-thumbs-up'
              ></i>
            </div>
            <span className='badge badge-pill badge-light ml-1'>
              {UpvoteCount}
            </span>
          </div>
          <div class='d-flex align-items-center'>
            <div
              class={`btn-sm btn-outline-light rounded-circle ${
                downvote ? 'bg-white text-dark' : ''
              }`}
              type='button'
              data-toggle='tooltip'
              data-placement='top'
              data-original-title='I dislike this'
            >
              <i
                onClick={() => {
                  downVote('downvote');
                }}
                class='far fa-thumbs-down'
              ></i>
            </div>
            <span class='badge badge-pill badge-light ml-1'>
              {DownvoteCount}
            </span>
          </div>
          <div
            onClick={() => {
              history.push(`/${item._id}`);
            }}
            class='btn-sm btn-outline-light rounded-circle'
            type='button'
            data-toggle='tooltip'
            data-placement='top'
            title=''
            data-original-title='Comment Here'
          >
            <i class='far fa-comment' aria-hidden='true'></i>
          </div>
        </div>
      </div>
    </li>
  );
};
