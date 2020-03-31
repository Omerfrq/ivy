import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export const Filter = ({ file, filter }) => {
  const { setFilter, state } = useContext(GlobalContext);

  const active =
    state.activeFilter === filter
      ? 'img-thumbnail custom-border border-dark'
      : '';

  return (
    <img
      onClick={() => {
        setFilter(filter);
      }}
      src={file}
      alt={filter}
      className={`${filter} ${active} filter-img cursor-pointer custom-rounded-colors-btn shadow-sm ml-2 mb-1`}
    />
  );
};
