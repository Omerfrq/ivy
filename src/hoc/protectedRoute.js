import React from 'react';
import { useIsLoggedIn } from '../components/hooks/useIsLoggedIn';

export const ProtectedRoute = ({ children }) => {
  useIsLoggedIn();
  return <>{children}</>;
};
