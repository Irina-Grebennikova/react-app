import { ChangeEvent, ReactElement, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import magnifier from '@/assets/icons/magnifier.svg';
import { Button } from '@/components/ui';
import { LocalStore } from '@/helpers';
import { setSearchQuery } from '@/redux/searchSlice';
import { RootState } from '@/redux/store';
import { Breed } from '@/types';

import styles from './search.module.scss';

type SearchProps = {
  showBreedsFromFirstPage: (itemsPerPage?: number) => void;
  updateBreeds: (query: string, page?: number, itemsPerPage?: number) => Promise<Breed[]>;
};

function Search({ showBreedsFromFirstPage, updateBreeds }: SearchProps): ReactElement {
  const { searchQuery } = useSelector((state: RootState) => state.search);

  const dispatch = useDispatch();

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();

    const newQuery = searchQuery.trim();
    LocalStore.setItem('search-query', newQuery);
    showBreedsFromFirstPage();
  }

  function handleClearBtnClick(): void {
    dispatch(setSearchQuery(''));
    LocalStore.removeItem('search-query');
    void updateBreeds('', 1);
  }

  const onSearchQueryChange = (e: ChangeEvent<HTMLInputElement>): void => void dispatch(setSearchQuery(e.target.value));

  return (
    <>
      <form className={styles.search} onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <img className={styles.searchIcon} src={magnifier} alt="Search"></img>
          <input
            className={styles.searchInput}
            placeholder="Example: pug, labrador"
            value={searchQuery}
            onChange={onSearchQueryChange}
            autoFocus
          />
          <div className={styles.clearIcon} onClick={handleClearBtnClick} data-testid="clear-button"></div>
        </div>
        <Button type="submit">Search</Button>
      </form>
    </>
  );
}

export { Search };
