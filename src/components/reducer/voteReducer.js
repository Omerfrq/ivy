export const voteReducer = (state, action) => {
  switch (action.type) {
    case 'downvote':
      state.downvote = !state.downvote;
      if (state.upvote) {
        state.upvote = false;
        state.UpvoteCount--;
        state.DownvoteCount++;
      } else if (state.downvote) {
        state.DownvoteCount++;
      } else if (!state.downvote) {
        state.DownvoteCount--;
      }
      return;

    case 'upvote':
      state.upvote = !state.upvote;
      if (state.downvote) {
        state.downvote = false;
        state.DownvoteCount--;
        state.UpvoteCount++;
      } else if (state.upvote) {
        state.UpvoteCount++;
      } else if (!state.upvote) {
        state.UpvoteCount--;
      }
      return;

    default:
      return state;
  }
};
