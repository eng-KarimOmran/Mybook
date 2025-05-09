import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

export default function RouterAdmin({children}) {
    const { user } = useContext(UserContext);

  if (user) {
    if(user?.role === "admin"){
        return children
    }else{
        return <Navigate to="/" replace />
    }
  }

  return <Navigate to="/sign-in" replace />
}
