import { SET_SIGNUP_MODAL_VISIBILITY } from '../actions/signup';

const initialState = {
  modalVisibility: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNUP_MODAL_VISIBILITY:
      return {
        ...state,
        modalVisibility: action.payload
      };
    default:
      return state;
  }
};
