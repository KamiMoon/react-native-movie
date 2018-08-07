export const SHOW_LOADING_SPINNER = "spinner/SHOW_LOADING_SPINNER";
export const HIDE_LOADING_SPINNER = "spinner/HIDE_LOADING_SPINNER";

export const showLoadingSpinner = () => ({
  type: SHOW_LOADING_SPINNER
});

export const hideLoadingSpinner = () => ({
  type: HIDE_LOADING_SPINNER
});

export default function reducer(state = { show: false }, action) {
  if (action.type === SHOW_LOADING_SPINNER) {
    return {
      show: true
    };
  } else if (action.type === HIDE_LOADING_SPINNER) {
    return {
      show: false
    };
  }

  return state;
}
