import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { getUserID } from '../../utils/helper';
import axios from 'axios';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const { state } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (state.isAuthenticated) {
      const id = getUserID(state);
      axios
        .get(`/post/get/all/${id}/mostLiked`)
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          setPosts(res.data);
        })
        .catch((err) => console.log(err.response));
    }
  }, [state]);
  return { isLoading, posts };
};
