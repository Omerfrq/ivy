import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { setAuthorizationToken } from '../../utils/helper';

export const useIsLoggedIn = () => {
  const history = useHistory();
  const { isLoggedIn, logout, isLoggedInGuest } = useContext(GlobalContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const guest = localStorage.getItem('guest');
    if (token !== null) {
      isLoggedIn();
      setAuthorizationToken();
    } else if (guest !== null) {
      isLoggedInGuest();
      setAuthorizationToken();
    } else {
      logout();
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);
};
