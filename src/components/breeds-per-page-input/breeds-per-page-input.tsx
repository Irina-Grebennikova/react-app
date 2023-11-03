import { ChangeEvent, ReactNode } from 'react';

import styles from './breeds-per-page-input.module.scss';

type BreedsPerPageInputProps = {
  breedsPerPage: number;
  totalCount: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function BreedsPerPageInput({ breedsPerPage, totalCount, handleChange }: BreedsPerPageInputProps): ReactNode {
  return (
    <label className={styles.breedsCountLabel} htmlFor="breeds-per-page">
      Breeds per page:
      <input
        className={styles.breedsCountInput}
        id="breeds-per-page"
        type="number"
        value={breedsPerPage}
        min={1}
        max={totalCount}
        onChange={handleChange}
      />
    </label>
  );
}

export { BreedsPerPageInput };
