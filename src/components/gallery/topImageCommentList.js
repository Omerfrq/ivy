import React from 'react';
import { TopImageComment } from './topImageComment';

export const TopImageCommentList = ({ comments }) => {
  return (
    <>
      {comments.map(comment => (
        <TopImageComment key={comment._id} comment={comment} />
      ))}
    </>
  );
};
