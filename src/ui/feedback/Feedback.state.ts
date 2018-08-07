export const SHOW_FEEDBACK = "ui/feedback/SHOW_FEEDBACK";
export const HIDE_FEEDBACK = "ui/feedback/HIDE_FEEDBACK";

export const showFeedback = feedback => ({
  type: SHOW_FEEDBACK,
  feedback
});

export const hideFeedback = () => ({
  type: HIDE_FEEDBACK
});

export default function reducer(state = { show: false, feedback: {} }, action) {
  if (action.type === SHOW_FEEDBACK) {
    return {
      show: true,
      feedback: action.feedback
    };
  } else if (action.type === HIDE_FEEDBACK) {
    return {
      show: false,
      feedback: {}
    };
  }

  return state;
}
