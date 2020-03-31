import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
export const useRedirect = () => {
  const { state } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    if (state.isAuthenticated) {
      history.push('/feed');
    } else {
      return;
    }
  }, [state.isAuthenticated, history]);
};
