import React, { useEffect, useState, useContext } from 'react';
import { GalleryItem } from './galleryItem';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';

export const GalleryList = () => {
  const [posts, setPosts] = useState([]);
  const { state } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    if (state.isAuthenticated) {
      setLoading(true);
      const id = state.type === 'guest' ? state.guest.id : state.user._id;
      axios
        .get(`/post/get/all/${id}/mostLiked`)
        .then(res => {
          setLoading(false);
          setPosts(res.data);
        })
        .catch(err => console.log(err.response));
    }
  }, [state.isAuthenticated]);
  return (
    <>
      <ul className='photo-grid masonry mt-5 px-0 pb-5'>
        {isLoading ? (
          'loading'
        ) : (
          <>
            {' '}
            {posts.length > 0 ? (
              <>
                {posts.map(item => (
                  <GalleryItem item={item} />
                ))}
              </>
            ) : (
              'loading'
            )}
          </>
        )}
      </ul>
    </>
  );
};
