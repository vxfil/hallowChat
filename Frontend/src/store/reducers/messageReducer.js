import { SEND_MESSAGE, MESSAGE_ISSEND } from '../types';

const initialState = {
  messages: [],
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
