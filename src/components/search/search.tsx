import { Dispatch, ReactElement } from 'react';

import magnifier from '@/assets/icons/magnifier.svg';
import { Button } from '@/components/ui';
import { LocalStore } from '@/helpers';
import { Breed } from '@/types';

import styles from './search.module.scss';

type SearchProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<React.SetStateAction<string>>;
  updateBreeds: (query: string, page?: number) => Promise<Breed[]>;
  showBreedsFromFirstPage: () => void;
};

function Search(props: SearchProps): ReactElement {
  const { searchQuery, setSearchQuery, showBreedsFromFirstPage, updateBreeds } = props;

  function handleSearchBtnClick(): void {
    const newQuery = searchQuery.trim();
    LocalStore.setItem('search-query', newQuery);
    showBreedsFromFirstPage();
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
            onChange={(e): void => setSearchQuery(e.target.value)}
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
