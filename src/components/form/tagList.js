import React from 'react';
import { Tag } from './tag';

const Tags = [
  'popular',
  'album',
  'trend',
  'fashion',
  'swag',
  'shoots',
  'rainy',
  'foggy'
];

export const TagList = () => {
  return (
    <>
      {Tags.map(tag => (
        <Tag key={tag} tag={tag} />
      ))}
    </>
  );
};
