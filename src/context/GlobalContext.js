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

  const updateComment = comment => {
    dispatch({
      type: 'UPDATE_COMMENT',
      payload: comment
    });
  };

  const updateReply = (reply, commentId) => {
    dispatch({
      type: 'UPDATE_REPLY',
      payload: reply,
      commentId
    });
  };

  const removeComment = commentId => {
    dispatch({
      type: 'REMOVE_COMMENT',
      payload: commentId
    });
  };

  const guestLogout = () => {
    dispatch({
      type: 'LOGOUT_GUEST'
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
        setActive,
        updateComment,
        updateReply,
        removeComment,
        guestLogout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
