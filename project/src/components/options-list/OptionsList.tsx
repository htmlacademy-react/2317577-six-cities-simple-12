import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { getFilterOptions } from '../../store/offers/selectors';
import { FilterOptions } from '../../types/filterOptions';
import OptionItem from '../option-item/OptionItem';

export const sortItems: FilterOptions[] = [
  { name: 'Popular', type: 'rating', order: 'asc' },
  { name: 'Price: low to high', type: 'price', order: 'asc' },
  { name: 'Price: high to low', type: 'price', order: 'desc' },
  { name: 'Top rated first', type: 'rating', order: 'desc' },
];

function OptionsList() {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const activeFilterOption = useAppSelector(getFilterOptions);
  const sortPopup = useRef<HTMLSpanElement | null>(null);

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (sortPopup.current && !sortPopup.current.contains(event.target as Node)) {
      setVisiblePopup(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        ref={sortPopup}
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleVisiblePopup}
        data-testid='active-filter-option'
      >
        {activeFilterOption.name}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          visiblePopup ? 'places__options--opened' : ''
        }`}
      >
        {sortItems.map((sortItem) => (
          <OptionItem {...sortItem} key={sortItem.name} />
        ))}
      </ul>
    </form>
  );
}

export default React.memo(OptionsList);
