import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
export const useRedirect = () => {
  const { state } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    if (state.isAuthenticated && state.type !== 'guest') {
      history.push('/');
    } else {
      return;
    }
  }, [state.isAuthenticated, history]);
};
