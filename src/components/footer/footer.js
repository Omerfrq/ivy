import React from 'react';

export const Footer = () => {
  return (
    <footer className='bg-light shadow custom-scroll-height__footer d-md-none fixed-bottom'>
      <div className='h-100 d-flex justify-content-around align-items-center'>
        <a href='./IVY-Nemesis-Main-Page.html' className='a-active'>
          <i className='fas fa-home fa-2x' aria-hidden='true'></i>
        </a>
        <a href='/'>
          <i className='fas fa-plus-circle fa-2x' aria-hidden='true'></i>
        </a>
        <a href='/'>
          <i className='fas fa-heart fa-2x' aria-hidden='true'></i>
        </a>
        <a href='/'>
          <i className='fas fa-user fa-2x' aria-hidden='true'></i>
        </a>
      </div>
    </footer>
  );
};
