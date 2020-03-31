import { useContext, useCallback } from 'react';
import API from '../../api/api';
import { GlobalContext } from '../../context/GlobalContext';

const id = Date.now();
const name = `Model${id}`;

export const useGuestSignup = () => {
  const { guestLogin } = useContext(GlobalContext);
  const loginGuest = useCallback(() => {
    API.signUpGuest({ name })
      .then(res => {
        const guest = {
          id: res.id,
          name
        };
        guestLogin(guest);
      })
      .catch(err => {
        console.log(err);
      });
  }, [guestLogin]);

  return { loginGuest };
};
