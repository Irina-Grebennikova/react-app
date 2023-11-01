import { ReactNode, useEffect, useState } from 'react';

import magnifier from '@/assets/icons/magnifier.svg';
import { Button } from '@/components/ui';
import { LocalStore } from '@/helpers';
import { Breed } from '@/types';

import styles from './search.module.scss';

type SearchProps = {
  updateBreeds: (query: string) => Promise<Breed[]>;
};

function Search({ updateBreeds }: SearchProps): ReactNode {
  const [searchQuery, setSearchQuery] = useState(LocalStore.getItem<string>('search-query') || '');

  useEffect(() => {
    void updateBreeds(searchQuery.trim());
  }, []);

  function updateSearchQuery(e: React.ChangeEvent<HTMLInputElement>): string {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    return newQuery;
  }

  function handleSearchBtnClick(): void {
    const newQuery = searchQuery.trim();
    LocalStore.setItem('search-query', newQuery);
    void updateBreeds(newQuery);
  }

  function handleEnterPress(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      void handleSearchBtnClick();
    }
  }

  function handleClearBtnClick(): void {
    setSearchQuery('');
    LocalStore.removeItem('search-query');
    void updateBreeds('');
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
