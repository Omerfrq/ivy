import React, { useEffect, useContext, useState } from 'react';
import { CommentList } from '../components/comments/commentList';
import { AddComment } from '../components/comments/addComment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';

export const SinglePost = () => {
  const params = useParams();
  const { state, setActive } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const { activePost } = state;
  useEffect(() => {
    if (state.isAuthenticated) {
      const id = state.type === 'guest' ? state.guest.id : state.user._id;
      axios
        .get(`/post/get/${params.id}/${id}`)
        .then(res => {
          setActive(res.data.article);
          console.log(res.data.article);
          setIsLoading(false);
        })
        .catch(err => console.log(err.response));
    }
    // eslint-disable-next-line
  }, [state.isAuthenticated]);
  return (
    <>
      <div class='container-fluid px-md-5'>
        {isLoading ? (
          'loading'
        ) : (
          <section class='bg-white mt-5 pt-5 px-3 px-md-5'>
            <header class='pt-4 mx-auto'>
              <div class='h2 text-uppercase'>{activePost.title}</div>
              <div className='h-70vh'>
                <img
                  class={`h-100  w-100 object-contain custom-rounded-2rem ${activePost.filter}`}
                  src={activePost.mediaUrl}
                  alt='Pic'
                />
              </div>
            </header>
            <CommentList comments={activePost.comments} />
            <AddComment resourceId={activePost._id} />
          </section>
        )}
      </div>
    </>
  );
};
