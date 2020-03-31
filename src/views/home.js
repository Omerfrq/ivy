import React from 'react';
import { WeekTopImage } from '../components/gallery/weekTopImage';

import { GalleryList } from '../components/gallery/galleryList';

export const Home = () => {
  return (
    <div className='container-fluid px-md-5'>
      <section className='bg-white mt-5 pt-5 px-3 px-md-5'>
        <WeekTopImage img='https://obbimages.s3.amazonaws.com/women-bg.jpg' />
        <main className='mt-4'>
          <div className='d-flex'>
            <div className='h2 text-uppercase'>Models</div>
            <span className='mt-4 border-dark ml-3 mr-5 border-top w-100'></span>
          </div>
          <GalleryList />
        </main>
      </section>
    </div>
  );
};
