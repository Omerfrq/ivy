import React, { useContext } from 'react';
import { CommentList } from '../components/comments/commentList';
import { AddComment } from '../components/comments/addComment';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { Spinner } from 'reactstrap';
import { ASSETS } from '../config/assetConfig';
import { useSinglePost } from '../components/hooks/useSinglePost';

export const SinglePost = () => {
  const params = useParams();
  const { state } = useContext(GlobalContext);
  const { isLoading } = useSinglePost(params.id);
  const { activePost } = state;
  const { postBy, title, mediaUrl, _id, filter, comments } = activePost;
  return (
    <div className='container-fluid px-md-2'>
      {isLoading ? (
        <section
          className='h-70vh d-flex justify-content-center 
        align-items-center mt-5 pt-5 px-md-5 '
        >
          <Spinner />
        </section>
      ) : (
        <section className=' mt-5 pt-5 px-md-5 '>
          <div className='h4 text-capitalize d-flex justify-content-between'>
            <span>{title}</span>
            <span>
              <img
                className='custom-user-pic-small'
                src={postBy.imageUrl || ASSETS.defaultImg}
                alt={title}
              />
            </span>
          </div>

          <div className='h-70vh'>
            <img
              className={`h-100 w-100 object-contain custom-rounded-1rem ${filter}`}
              src={mediaUrl}
              alt={title}
            />
          </div>
          <div className='col-md-10 p-0 mt-3'>
            <AddComment resourceId={_id} />
            <CommentList comments={comments} />
          </div>
        </section>
      )}
    </div>
  );
};
