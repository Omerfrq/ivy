import axios from 'axios';

export const getUserID = (state) =>
  state.type === 'guest' ? state.guest._id : state.user._id;

const getJwt = () => {
  const guest = localStorage.getItem('token');
  const user = localStorage.getItem('guest');
  if (guest !== null) {
    return guest;
  } else {
    return user;
  }
};
export const setAuthorizationToken = () => {
  const token = getJwt();
  token
    ? (axios.defaults.headers.common['Authorization'] = `Token ${token}`)
    : delete axios.defaults.headers.common['Authorization'];
};
