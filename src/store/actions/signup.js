export const SET_SIGNUP_MODAL_VISIBILITY = 'SET_SIGNUP_MODAL_VISIBILITY';

export function setSignupModalVisibility(value) {
  return dispatch => {
    dispatch({
      payload: value,
      type: SET_SIGNUP_MODAL_VISIBILITY
    });
  };
}
