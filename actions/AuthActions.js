import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL } from './types';

export const loginAction = (email, password, navigate, userRole) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    const { token, headmaster } = response.data;
    localStorage.setItem('token', token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, headmaster, userRole }
    });
    navigate('/dashboard');
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message
    });
  }
};
