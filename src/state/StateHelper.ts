export function getInitialState(): object {
  return {
    isLoading: false,
    disableEdit: false,
    feedback: {
      show: false
    }
  };
}

export function getLoadingState(): object {
  return {
    isLoading: true,
    disableEdit: true,
    feedback: {}
  };
}

export function getAfterLoadingState(): object {
  return {
    isLoading: false,
    disableEdit: false
  };
}

export function getError(e: any): object {
  const errorMsg =
    e.response && e.response.data && e.response.data.message
      ? e.response.data.message
      : e.toString();

  return {
    isLoading: false,
    disableEdit: false,
    feedback: {
      show: true,
      title: "Error",
      msg: errorMsg
    }
  };
}

export function buildLoadingState(state) {
  return {
    ...state,
    ...getLoadingState()
  };
}

export function buildErrorState(state, action) {
  return {
    ...state,
    ...getError(action.error)
  };
}
