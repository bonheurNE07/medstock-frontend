import API from './api';

export const loginWithEmail = async (email: string, password: string) => {
  const response = await API.post('/auth/login/', {
    email,
    password,
  });
  return response.data;
};

export const refreshToken = async (refresh: string) => {
  const response = await API.post('/auth/refresh/', { refresh });
  return response.data;
};
