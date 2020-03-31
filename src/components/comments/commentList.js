import React from 'react';
import { CommentItem } from './commentItem';

export const CommentList = ({ comments }) => {
  console.log(comments);
  return (
    <main class='mt-4'>
      <div class='text-black-50'>
        {comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>
    </main>
  );
};
