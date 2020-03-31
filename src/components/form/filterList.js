import React from 'react';
import { Filter } from './filter';

const Filters = [
  '_1977',
  'aden',
  'brooklyn',
  'earlybird',
  'gingham',
  'hudson',
  'lofi',
  'mayfair',
  'perpetua',
  'reyes',
  'toaster',
  'walden',
  'xpro2',
  'inkwell'
];

export const FilterList = ({ image }) => {
  return (
    <>
      {Filters.map(filter => (
        <Filter key={filter} file={image} filter={filter} />
      ))}
    </>
  );
};
