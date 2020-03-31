import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

export const useIsLoggedIn = () => {
  const history = useHistory();
  const { isLoggedIn, logout, isLoggedInGuest } = useContext(GlobalContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const guest = JSON.parse(localStorage.getItem('guest'));
    if (token !== null) {
      isLoggedIn();
    } else if (guest !== null) {
      isLoggedInGuest();
    } else {
      logout();
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);
};
