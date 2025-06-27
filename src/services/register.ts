import API from './api';

// 1. Send verification code
export const sendVerificationCode = async (email: string, phone_number: string) => {
  const response = await API.post('auth/send-code/', { email, phone_number });
  return response.data;
};

// 2. Verify confirmation code
export const verifyCode = async (email: string, code: string) => {
  const response = await API.post('auth/verify-code/', { email, code });
  return response.data;
};

// 3. Set password and create account
export const setPassword = async (email: string, password: string) => {
  const response = await API.post('auth/set-password/', { email, password });
  return response.data;
};