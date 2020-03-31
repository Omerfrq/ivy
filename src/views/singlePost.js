import React, { useEffect, useContext, useState } from 'react';
import { CommentList } from '../components/comments/commentList';
import { AddComment } from '../components/comments/addComment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';

export const SinglePost = () => {
  const params = useParams();
  const { state } = useContext(GlobalContext);
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (state.isAuthenticated) {
      axios
        .get(`/post/get/${params.id}/${state.user._id}`)
        .then(res => {
          console.log(res.data.article);
          setPost(res.data.article);
          setIsLoading(false);
        })
        .catch(err => console.log(err.response));
    }
  }, [state.isAuthenticated]);
  return (
    <>
      <div class='container-fluid px-md-5'>
        {isLoading ? (
          'loading'
        ) : (
          <section class='bg-white mt-5 pt-5 px-3 px-md-5'>
            <header class='pt-4 mx-auto'>
              <div class='h2 text-uppercase'>Single Image</div>
              <img
                class={`img-fluid ${post.filter}`}
                src={post.mediaUrl}
                alt='Pic'
              />
            </header>
            <CommentList comments={post.comments} />
            <AddComment />
          </section>
        )}
      </div>
    </>
  );
};
