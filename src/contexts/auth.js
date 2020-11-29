import React, { useContext } from 'react';

const auhtContext = React.createContext();

export const AuthContextProvider = auhtContext.Provider;
export const AuthContextConsumer = auhtContext.Consumer;

export const useAuthContext = () => {
  const auth = useContext(auhtContext);
  return auth;
};

export default auhtContext;
