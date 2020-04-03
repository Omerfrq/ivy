import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { getUserID } from '../../utils/helper';
import axios from 'axios';
export const useSinglePost = resourceId => {
  const { state, setActive } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(state);
    if (state.isAuthenticated) {
      console.log(state);
      const id = getUserID(state);

      axios
        .get(`/post/get/${resourceId}/${id}`)
        .then(res => {
          setActive(res.data.article);
          setIsLoading(false);
        })
        .catch(err => console.log(err.response));
    }
    // eslint-disable-next-line
  }, [state.isAuthenticated]);
  return { isLoading };
};
