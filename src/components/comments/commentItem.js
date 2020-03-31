import React from 'react';
import date from '../../utils/date';

export const CommentItem = ({ comment }) => {
  const { imageUrl, name } = comment.userId;
  const { text, createdAt } = comment;
  return (
    <div class='flex-column flex-lg-row py-5 row text-center text-lg-left custom-border-y'>
      <div class='col col-lg-1 mb-3 mb-lg-0'>
        <img
          class='custom-user-pic rounded-circle custom-shadow-box'
          src={imageUrl}
          alt='user'
        />
      </div>
      <div class='col col-lg-8 col-xl-7 mb-3 mb-lg-0'>
        <div class='h4 font-weight-normal text-muted text-capitalize'>
          {name}
        </div>
        <div class='text-justify '>{text}</div>
      </div>
      <div class='h4 col col-xl-2 col-xl-3 mx-auto my-auto'>
        {date.fromNow(createdAt)}
      </div>
    </div>
  );
};
