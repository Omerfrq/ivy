import React, { useEffect, useContext, useState } from 'react';
import { CommentList } from '../components/comments/commentList';
import { AddComment } from '../components/comments/addComment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { Spinner } from 'reactstrap';
import { getUserID } from '../utils/helper';
import { ASSETS } from '../config/assetConfig';

export const SinglePost = () => {
  const params = useParams();
  const { state, setActive } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const { activePost } = state;
  useEffect(() => {
    if (state.isAuthenticated) {
      const id = getUserID(state);
      axios
        .get(`/post/get/${params.id}/${id}`)
        .then(res => {
          setActive(res.data.article);
          setIsLoading(false);
        })
        .catch(err => console.log(err.response));
    }
    // eslint-disable-next-line
  }, [state.isAuthenticated]);
  return (
    <div className='container-fluid px-md-2'>
      {isLoading ? (
        <section className='h-70vh d-flex justify-content-center align-items-center mt-5 pt-5 px-md-5 '>
          <Spinner />
        </section>
      ) : (
        <section className=' mt-5 pt-5 px-md-5 '>
          <div className='h4 text-capitalize d-flex justify-content-between'>
            <span>{activePost.title}</span>
            <span>
              <img
                className='custom-user-pic-small'
                src={activePost.postBy.imageUrl || ASSETS.defaultImg}
                alt=''
              />
            </span>
          </div>

          <div className='h-70vh'>
            <img
              className={`h-100 w-100 object-contain custom-rounded-1rem ${activePost.filter}`}
              src={activePost.mediaUrl}
              alt={activePost.title}
            />
          </div>
          <div className='col-md-10 p-0 mt-3'>
            <AddComment resourceId={activePost._id} />
            <CommentList comments={activePost.comments} />
          </div>
        </section>
      )}
    </div>
  );
};
