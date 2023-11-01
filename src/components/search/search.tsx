import { ReactNode } from 'react';

import magnifier from '@/assets/icons/magnifier.svg';
import { Button } from '@/components/ui';
import { LocalStore } from '@/helpers';
import { Breed } from '@/types';

import styles from './search.module.scss';

type SearchProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  updateBreeds: (query: string, page?: number) => Promise<Breed[]>;
};

function Search({ searchQuery, setSearchQuery, updateBreeds }: SearchProps): ReactNode {
  function updateSearchQuery(e: React.ChangeEvent<HTMLInputElement>): string {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    return newQuery;
  }

  function handleSearchBtnClick(): void {
    const newQuery = searchQuery.trim();
    LocalStore.setItem('search-query', newQuery);
    void updateBreeds(newQuery, 1);
  }

  function handleEnterPress(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      void handleSearchBtnClick();
    }
  }

  function handleClearBtnClick(): void {
    setSearchQuery('');
    LocalStore.removeItem('search-query');
    void updateBreeds('', 1);
  }

  return (
    <>
      <div className={styles.search}>
        <div className={styles.inputBox}>
          <img className={styles.searchIcon} src={magnifier} alt="Search"></img>
          <input
            className={styles.searchInput}
            placeholder="Example: pug, labrador"
            value={searchQuery}
            onChange={updateSearchQuery}
            onKeyDown={handleEnterPress}
            autoFocus
          />
          <div className={styles.clearIcon} onClick={handleClearBtnClick}></div>
        </div>
        <Button onClick={handleSearchBtnClick}>Search</Button>
      </div>
    </>
  );
}

export { Search };
