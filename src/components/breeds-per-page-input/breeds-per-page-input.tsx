import { ChangeEvent, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

import styles from './breeds-per-page-input.module.scss';

type BreedsPerPageInputProps = {
  totalCount: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function BreedsPerPageInput({ totalCount, handleChange }: BreedsPerPageInputProps): ReactElement {
  const { breedsPerPage } = useSelector((state: RootState) => state.search);

  const value = breedsPerPage < totalCount ? breedsPerPage : totalCount;

  return (
    <label className={styles.breedsCountLabel} htmlFor="breeds-per-page">
      Breeds per page:
      <input
        className={styles.breedsCountInput}
        id="breeds-per-page"
        type="number"
        value={value}
        min={1}
        max={totalCount}
        onChange={handleChange}
      />
    </label>
  );
}

export { BreedsPerPageInput };
