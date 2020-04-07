import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { getUserID } from '../../utils/helper';
import axios from 'axios';
import { useGuestSignup } from './useGuest';

export const useSinglePost = (resourceId) => {
  const { state, setActive, guestLogout, logout } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);
  const { loginGuest } = useGuestSignup();

  useEffect(() => {
    if (state.isAuthenticated) {
      const id = getUserID(state);
      axios
        .get(`/post/get/${resourceId}/${id}`)
        .then((res) => {
          setActive(res.data.article);
          setIsLoading(false);
        })
        .catch((err) => {
          if (!err.response.data.loggedIn) {
            if (state.type === 'guest') {
              guestLogout();
            } else {
              logout();
            }
          }
        });
    } else {
      if (localStorage.getItem('token') === null) {
        loginGuest();
      }
    }
    // eslint-disable-next-line
  }, [state.isAuthenticated]);
  return { isLoading };
};
