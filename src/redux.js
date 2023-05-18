// redux.js

import { createStore } from 'redux';

// Actions
const SET_USERS = 'SET_USERS';

// Action creators
export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

// Reducer
const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

// Store
const store = createStore(reducer);

export default store;

