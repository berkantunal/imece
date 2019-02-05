import { SET_MODAL_VISIBILITY } from '../actions/login';

const initialState = {
  loginModalVisibility: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_VISIBILITY:
      return {
        ...state,
        loginModalVisibility: action.payload
      };
    default:
      return state;
  }
};
