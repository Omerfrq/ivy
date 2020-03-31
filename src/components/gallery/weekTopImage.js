import React from 'react';

export const WeekTopImage = ({ img }) => {
  return (
    <header className='pt-4 mx-auto'>
      <div className='h2 text-uppercase'>Week top</div>
      <div className='position-relative vh-100'>
        <img
          className='img-fluid custom-rounded-2rem hero-background'
          src={img}
          alt={img}
        />
      </div>
    </header>
  );
};
