import React, { useEffect, useContext, useState } from 'react';
import { WeekTopImage } from '../components/gallery/weekTopImage';

import { GalleryList } from '../components/gallery/galleryList';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { getUserID } from '../utils/helper';
import { useGuestSignup } from '../components/hooks/useGuest';
import { ASSETS } from '../config/assetConfig';
export const Home = () => {
  const { state } = useContext(GlobalContext);
  const [topImage, setTopImage] = useState('');
  const { loginGuest } = useGuestSignup();

  useEffect(() => {
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
    <div className='container-fluid p-0 px-md-5'>
      <section className='bg-grey mt-5 pt-5 px-3 px-md-5'>
        {topImage ? (
          <>
            <WeekTopImage topImage={topImage} />
          </>
        ) : (
          ''
        )}

        <main className='mt-4'>
          <div className='d-flex'>
            <div className='h4 text-capitalize d-flex justify-content-between align-items-end w-100'>
              <span>Models</span>
              <span>
                <img
                  className='custom-user-pic-small'
                  src={ASSETS.defaultImg}
                  alt=''
                />
              </span>
            </div>
            {/* <span className='mt-4 border-dark ml-3 mr-5 border-top w-100'></span> */}
          </div>
          <GalleryList />
        </main>
      </section>
    </div>
  );
};
