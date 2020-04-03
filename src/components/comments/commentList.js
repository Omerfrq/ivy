import React from 'react';
import { CommentItem } from './commentItem';

export const CommentList = ({ comments }) => {
  return (
    <div className='mt-4 mb-5'>
      <div className='text-black-50'>
        {comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
