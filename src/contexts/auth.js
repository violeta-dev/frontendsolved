import React from 'react';

const auhtContext = React.createContext();

export const AuthContextProvider = auhtContext.Provider;
export const AuthContextConsumer = auhtContext.Consumer;

export default auhtContext;
