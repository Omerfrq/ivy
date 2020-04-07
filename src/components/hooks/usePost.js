import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { getUserID } from '../../utils/helper';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useGuestSignup } from './useGuest';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const { state, logout, guestLogout } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);
  const { loginGuest } = useGuestSignup();
  useEffect(() => {
    if (state.isAuthenticated) {
      const id = getUserID(state);
      console.log(state);
      axios
        .get(`/post/get/all/${id}/mostLiked`)
        .then((res) => {
          setLoading(false);
          setPosts(res.data);
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
    }
  }, [state.isAuthenticated]);
  return { isLoading, posts };
};
