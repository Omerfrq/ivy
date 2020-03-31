import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export const Tag = ({ tag }) => {
  const [active, setActive] = useState(false);

  const { addTag, removeTag } = useContext(GlobalContext);
  useEffect(() => {
    active ? addTag(tag) : removeTag(tag);
    // eslint-disable-next-line
  }, [active]);

  const toggle = () => {
    setActive(!active);
  };

  return (
    <span
      onClick={toggle}
      className={`badge cursor-pointer mb-2 ml-1 py-2 shadow-sm  ${
        active ? 'badge-info' : 'custom-badge'
      }`}
    >
      # {tag}
    </span>
  );
};
