export const SET_MODAL_VISIBILITY = 'SET_MODAL_VISIBILITY';

export function setModalVisibility(value) {
  return dispatch => {
    dispatch({
      payload: value,
      type: SET_MODAL_VISIBILITY
    });
  };
}
