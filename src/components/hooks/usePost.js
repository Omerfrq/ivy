import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { getUserID } from '../../utils/helper';
import axios from 'axios';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);

  const { state, logout, guestLogout } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);

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
    // eslint-disable-next-line
  }, [state.isAuthenticated]);
  return { isLoading, posts };
};
