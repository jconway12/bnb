const thunk = (store) => next => action => {
  // debugger
    if (typeof action === "function") {
      return action(store.dispatch, store.getState);
    }
    return next(action);
}

export default thunk;

//do i need this????