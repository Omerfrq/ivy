export const getUserID = state =>
  state.type === 'guest' ? state.guest.id : state.user._id;
