import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setFilterOptions } from '../../store/offers/offers';
import { FilterOptions } from '../../types/filterOptions';

function OptionItem({ name, type, order }: FilterOptions) {
  const dispatch = useAppDispatch();

  const onClickSetSortOption = () => {
    dispatch(setFilterOptions({name, type, order}));
  };

  return (
    <li onClick={onClickSetSortOption} className="places__option places__option--active" tabIndex={0}>
      {name}
    </li>
  );
}

export default React.memo(OptionItem);
