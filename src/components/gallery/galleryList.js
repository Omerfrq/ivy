import React from 'react';
import { GalleryItem } from './galleryItem';
import { Spinner } from 'reactstrap';
import { usePosts } from '../hooks/usePost';

export const GalleryList = () => {
  const { isLoading, posts } = usePosts();
  return (
    <>
      {isLoading ? (
        <div className='h-70 d-flex justify-content-center align-items-center'>
          <Spinner />
        </div>
      ) : (
        <>
          {posts.length > 0 ? (
            <ul className='photo-grid masonry mt-2 px-0 pb-5'>
              {posts.map(item => (
                <GalleryItem key={item._id} item={item} />
              ))}
            </ul>
          ) : (
            <div className='h4 text-capitalize'>No Posts Added.</div>
          )}
        </>
      )}
    </>
  );
};
