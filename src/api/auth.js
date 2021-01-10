import client from './client';

export const login = credentials => client.login(credentials);

export const logout = () => client.logout();
