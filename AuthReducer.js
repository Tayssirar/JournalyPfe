import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  userRole: null,
  errorMessage: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        user: payload.headmaster,
        userRole: payload.userRole,
        errorMessage: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        userRole: null,
        errorMessage: payload
      };
    default:
      return state;
  }
}
