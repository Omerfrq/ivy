import React, { useEffect, useContext, useState } from 'react';
import { WeekTopImage } from '../components/gallery/weekTopImage';

import { GalleryList } from '../components/gallery/galleryList';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { getUserID } from '../utils/helper';
import { useGuestSignup } from '../components/hooks/useGuest';

export const Home = () => {
  const { state } = useContext(GlobalContext);
  const [topImage, setTopImage] = useState('');
  const { loginGuest } = useGuestSignup();

  useEffect(() => {
    console.log('i ran');
    if (state.isAuthenticated) {
      const id = getUserID(state);
      axios
        .get(`/post/top/${id}`)
        .then(res => {
          setTopImage(res.data[0]);
        })
        .catch(err => console.log(err.response));
    } else {
      if (localStorage.getItem('token') === null) {
        loginGuest();
      }
    }
  }, [state.isAuthenticated]);
  return (
    <div className='container-fluid px-md-5'>
      <section className='bg-white mt-5 pt-5 px-3 px-md-5'>
        {topImage ? (
          <>
            <WeekTopImage topImage={topImage} />
          </>
        ) : (
          ''
        )}

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
