import React, { createContext , useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const UserUpdate = () => {
    const updatedUser = JSON.parse(localStorage.getItem('user'));
    setUser(updatedUser);
  };

  const value = { user, setUser, UserUpdate };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
