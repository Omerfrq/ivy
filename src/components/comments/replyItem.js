import React from 'react';
import date from '../../utils/date';
import { ASSETS } from '../../config/assetConfig';

export const ReplyItem = ({ reply }) => {
  const { createdAt, text, userId } = reply;
  const { imageUrl, name } = userId;
  return (
    <div className='row mt-3 mb-2 border-left-custom border-dark'>
      <div className=' d-flex align-items-start p-0 mb-1 w-100'>
        <div className='reply-img mr-2 ml-1'>
          <img
            className='h-100 w-100 border-circle '
            src={imageUrl || ASSETS.defaultImg}
            alt={name}
          />
        </div>
        <div className='d-flex flex-column w-100'>
          <div
            className='font-weight-bold d-flex 
          justify-content-between align-items-center mb-1'
          >
            <span className='text-capitalize'>
              <span>{name}</span>
            </span>
            <span className='mr-2 small text-capitalize'>
              {date.fromNow(createdAt)}
            </span>
          </div>
          <div className='text-muted mb-1 text-left'>{text}</div>
        </div>
      </div>
    </div>
  );
};
