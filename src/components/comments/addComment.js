import React from 'react';

export const AddComment = () => {
  return (
    <div class='col col-lg-10 col-xl-9 py-5'>
      <div class='pb-4'>Add your comments...</div>
      <div class='pb-4'>
        <textarea
          class='w-100 custom-rounded-2rem border-white custom-shadow pt-4 pl-4'
          rows='10'
        ></textarea>
      </div>
      <div class='text-right'>
        <button
          class='btn text-uppercase myButton rounded-pill font-weight-bold'
          type='submit'
        >
          Submit
        </button>
      </div>
    </div>
  );
};
