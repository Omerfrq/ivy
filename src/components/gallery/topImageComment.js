import React from 'react';
import date from '../../utils/date';
import { stringTruncate } from '../../utils/format';
import { ASSETS } from '../../config/assetConfig';

export const TopImageComment = ({ comment }) => {
  const { userId, createdAt, text } = comment;

  return (
    <div className='overflow-hidden sm-d-none'>
      <div className='col-md-12 p-1 small shadow-sm border-left-custom border-white mb-2'>
        <div className='row'>
          <div className='col-md-3 p-0 d-flex justify-content-center'>
            <div className='custom-user-pic-small'>
              <img
                src={userId?.imageUrl || ASSETS.defaultImg}
                alt={userId?.name}
                className=' h-100 w-100 rounded-circle'
              />
            </div>
          </div>

          <div className='col-md-9 p-0'>
            <div className=' d-flex flex-column '>
              <div className='font-weight-bold align-items-end small d-flex justify-content-between'>
                <span className='text-capitalize m-0'>
                  {stringTruncate(userId?.name, 10)}
                </span>
                <span className='small text-capitalize mr-3'>
                  {date.fromNow(createdAt)}
                </span>
              </div>
              <div className='d-flex align-items-start'>
                <small>{stringTruncate(text, 20)}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
