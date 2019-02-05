export const SET_LOGIN_MODAL_VISIBILITY = 'SET_LOGIN_MODAL_VISIBILITY';

export function setLoginModalVisibility(value) {
  return dispatch => {
    dispatch({
      payload: value,
      type: SET_LOGIN_MODAL_VISIBILITY
    });
  };
}
