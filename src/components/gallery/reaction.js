import React from 'react';

const getReactionsType = type => {
  const reaction = {
    title: '',
    favIcon: ''
  };
  if (type === 'Like') {
    reaction.title = 'I Like This.';
    reaction.favIcon = 'far fa-thumbs-up';
    return reaction;
  } else if (type === 'DisLike') {
    reaction.title = 'I Dislike This.';
    reaction.favIcon = 'far fa-thumbs-down';
    return reaction;
  } else {
    reaction.title = 'Leave a Comment.';
    reaction.favIcon = 'far fa-comment';
    return reaction;
  }
};

export const Reaction = ({ type, count, onClickHandler }) => {
  const { title, favIcon } = getReactionsType(type);

  return (
    <>
      <div
        className='btn-sm btn-outline-light rounded-circle'
        data-toggle='tooltip'
        data-placement='top'
        title={title}
      >
        <i
          onClick={() => {
            onClickHandler();
          }}
          className={favIcon}
        ></i>
      </div>
      <span className='badge badge-pill badge-light ml-1'>{count}</span>
    </>
  );
};
