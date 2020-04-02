import React from 'react';
import date from '../../utils/date';

const defaultImage =
  'https://www.flaticon.com/premium-icon/icons/svg/1993/1993420.svg';

export const ReplyItem = ({ reply }) => {
  const { createdAt, text, userId } = reply;
  const { imageUrl, name } = userId;
  return (
    <div className='row mt-3 mb-2 border-left-custom border-dark'>
      <div className=' d-flex align-items-start p-0 mb-1 w-100'>
        <div className='reply-img mr-2 ml-1'>
          <img
            className='h-100 w-100 border-circle '
            src={imageUrl || defaultImage}
            alt={name}
          />
        </div>
        <div className='d-flex flex-column w-100'>
          <div
            className='font-weight-bold d-flex 
          justify-content-between align-items-center mb-1'
          >
            <span className='text-capitalize'>{name}</span>
            <span className='mr-2 small    text-capitalize'>
              {date.fromNow(createdAt)}
            </span>
          </div>
          <div className='text-muted mb-1'>{text}</div>
        </div>
      </div>
    </div>
  );
};
