import jwt from 'jsonwebtoken';
export default (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload);
      const user = jwt.decode(action.payload);
      state.isAuthenticated = true;
      state.user = user;
      return;

    case 'GUEST_LOGIN':
      localStorage.setItem('guest', JSON.stringify(action.payload));
      state.guest = action.payload;
      state.type = 'guest';
      state.isAuthenticated = true;
      return;

    case 'IS_LOGGED_IN':
      const loggedInUser = jwt.decode(localStorage.getItem('token'));
      state.isAuthenticated = true;
      state.user = loggedInUser;
      return;

    case 'IS_LOGGED_IN_GUEST':
      const guest = localStorage.getItem('guest');
      state.type = 'guest';
      state.isAuthenticated = true;
      state.guest = JSON.parse(guest);
      return;

    case 'LOGOUT':
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.user = null;
      return;

    case 'ADD_TAG':
      state.tags.push(action.payload);
      return;

    case 'REMOVE_TAG':
      state.tags = state.tags.filter(tag => tag !== action.payload);
      return;

    case 'SET_FILTER':
      state.activeFilter = action.payload;
      return;

    case 'SET_ACTIVE':
      state.activePost = action.payload;
      return;

    case 'UPDATE_COMMENT':
      state.activePost.comments.push(action.payload);
      return;
    case 'UPDATE_REPLY':
      state.activePost.comments.map(comment =>
        comment._id === action.commentId
          ? comment.replies.push(action.payload)
          : ''
      );
      return;

    case 'REMOVE_COMMENT':
      state.activePost.comments.map((comment, index) =>
        comment._id === action.payload
          ? state.activePost.comments.splice(index, 1)
          : ''
      );
      return;

    default:
      return state;
  }
};
