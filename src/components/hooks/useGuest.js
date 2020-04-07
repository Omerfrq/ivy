import { useContext, useCallback } from 'react';
import API from '../../api/api';
import { GlobalContext } from '../../context/GlobalContext';
import { setAuthorizationToken } from '../../utils/helper';

const id = Date.now();
const name = `Model-${id}`;

export const useGuestSignup = () => {
  const { guestLogin } = useContext(GlobalContext);
  const loginGuest = useCallback(() => {
    if (localStorage.getItem('guest')) {
      const guest = localStorage.getItem('guest');
      guestLogin(guest);
    } else {
      API.signUpGuest({ name })
        .then((res) => {
          guestLogin(res.token);
          setAuthorizationToken();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [guestLogin]);

  return { loginGuest };
};
