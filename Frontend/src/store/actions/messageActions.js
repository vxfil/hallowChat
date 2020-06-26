import { SEND_MESSAGE, MESSAGE_ISSEND } from '../types';

export const sendMessage = (message) => {
  return {
    type: SEND_MESSAGE,
    payload: message,
  };
};
