import { SET_LOGIN_MODAL_VISIBILITY } from '../actions/login';

const initialState = {
  isLoggedIn: false,
  modalVisibility: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_MODAL_VISIBILITY:
      return {
        ...state,
        modalVisibility: action.payload
      };
    default:
      return state;
  }
};
