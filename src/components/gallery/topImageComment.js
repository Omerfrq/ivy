import React from 'react';
import date from '../../utils/date';
import { stringTruncate } from '../../utils/format';
import { ASSETS } from '../../config/assetConfig';

export const TopImageComment = ({ comment }) => {
  const { userId, createdAt, text } = comment;
  return (
    <div className='overflow-hidden'>
      <div className='col-md-12 p-0 small'>
        <div className='row'>
          <div className='col-md-3 '>
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
              <div className='font-weight-bold mb-1 align-items-end small d-flex justify-content-between'>
                <span className='text-capitalize mr-1 m-0'>
                  {stringTruncate(userId?.name, 10)}
                </span>
                <span className='small text-capitalize'>
                  {date.fromNow(createdAt)}
                </span>
              </div>
              <div>
                <small>{stringTruncate(text, 20)}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
