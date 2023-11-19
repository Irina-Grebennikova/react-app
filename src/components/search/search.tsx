import { ReactElement, SyntheticEvent, useContext } from 'react';

import magnifier from '@/assets/icons/magnifier.svg';
import { Button } from '@/components/ui';
import { LocalStore } from '@/helpers';
import { SearchPageContext } from '@/pages/search-page';

import styles from './search.module.scss';

function Search(): ReactElement {
  const { searchQuery, setSearchQuery, showBreedsFromFirstPage, updateBreeds } = useContext(SearchPageContext);

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();

    const newQuery = searchQuery.trim();
    LocalStore.setItem('search-query', newQuery);
    showBreedsFromFirstPage();
  }

  function handleClearBtnClick(): void {
    setSearchQuery('');
    LocalStore.removeItem('search-query');
    void updateBreeds('', 1);
  }

  return (
    <>
      <form className={styles.search} onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <img className={styles.searchIcon} src={magnifier} alt="Search"></img>
          <input
            className={styles.searchInput}
            placeholder="Example: pug, labrador"
            value={searchQuery}
            onChange={(e): void => setSearchQuery(e.target.value)}
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
