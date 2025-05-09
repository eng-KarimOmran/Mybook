import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

export default function UserGuest({children}) {
    const { user } = useContext(UserContext);

  if (user) {
    return children
  }

  return <Navigate to="/sign-in" replace />
}
