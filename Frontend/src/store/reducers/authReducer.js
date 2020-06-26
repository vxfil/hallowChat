import { SWITCH_ICON } from '../types';

const initialState = {
  icon: 'eye',
  isHidden: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_ICON:
      return {
        ...state,
        icon: state.icon === 'eye' ? 'eye-slash' : 'eye',
        isHidden: !state.isHidden,
      };
    default:
      return state;
  }
};
