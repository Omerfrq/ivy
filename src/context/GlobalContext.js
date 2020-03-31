import React, { createContext } from 'react';
import AppReducer from './AppReducer';
import { useImmerReducer } from 'use-immer';

const initialState = {
  tags: [],
  isAuthenticated: false,
  user: null,
  activeFilter: '',
  type: null,
  activePost: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(AppReducer, initialState);

  const login = token => {
    dispatch({
      type: 'LOGIN',
      payload: token
    });
  };

  const guestLogin = guest => {
    dispatch({
      type: 'GUEST_LOGIN',
      payload: guest
    });
  };

  const isLoggedIn = () => {
    dispatch({
      type: 'IS_LOGGED_IN'
    });
  };

  const isLoggedInGuest = () => {
    dispatch({
      type: 'IS_LOGGED_IN_GUEST'
    });
  };

  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    });
  };

  const addTag = payload => {
    dispatch({
      type: 'ADD_TAG',
      payload
    });
  };

  const setActive = payload => {
    dispatch({
      type: 'SET_ACTIVE',
      payload
    });
  };

  const setFilter = payload => {
    dispatch({
      type: 'SET_FILTER',
      payload
    });
  };

  const removeTag = payload => {
    dispatch({
      type: 'REMOVE_TAG',
      payload
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        state,
        login,
        isLoggedIn,
        isLoggedInGuest,
        logout,
        guestLogin,
        addTag,
        removeTag,
        setFilter,
        setActive
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
