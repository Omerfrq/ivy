import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export const Placeholder = ({
  placeholder,
  onImageClick,
  inputFile,
  onChange,
  height = 'h-75',
  borderRadius = 'border-circle'
}) => {
  const { state } = useContext(GlobalContext);
  return (
    <>
      <div
        className={`${
          placeholder ? '' : 'custom-rounded-1rem custom-bg-gray-light'
        }   
        ${height}  d-flex align-items-center justify-content-center`}
        type='button'
        onClick={onImageClick}
      >
        <input
          type='file'
          name='file'
          accept='image/png/jpeg'
          ref={inputFile}
          style={{ display: 'none' }}
          onChange={onChange}
        />
        {placeholder ? (
          <img
            src={placeholder}
            alt={placeholder}
            className={`${
              borderRadius === 'custom-rounded-1rem' ? '' : 'h-100'
            }h-100 w-100 ${borderRadius} ${state.activeFilter}`}
          />
        ) : (
          <button className='btn badge-pill btn-secondary'>
            <i className='fas fa-plus fa-2x' aria-hidden='true'></i>
          </button>
        )}
      </div>
    </>
  );
};
