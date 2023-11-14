import { ReactElement, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import magnifier from '@/assets/icons/magnifier.svg';
import { Button } from '@/components/ui';
import { LocalStore } from '@/helpers';
import { selectFromSearch, setSearchQuery } from '@/store';

import styles from './search.module.scss';

type SearchProps = {
  setFirstPage: () => void;
};

function Search({ setFirstPage }: SearchProps): ReactElement {
  const { searchQuery } = useSelector(selectFromSearch);

  const dispatch = useDispatch();

  const [query, setQuery] = useState(searchQuery);

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();

    const newQuery = query.trim();
    LocalStore.setItem('search-query', newQuery);
    dispatch(setSearchQuery(newQuery));
    setFirstPage();
  }

  function handleClearBtnClick(): void {
    setQuery('');
    dispatch(setSearchQuery(''));
    LocalStore.removeItem('search-query');
  }

  return (
    <>
      <form className={styles.search} onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <img className={styles.searchIcon} src={magnifier} alt="Search"></img>
          <input
            className={styles.searchInput}
            placeholder="Example: pug, labrador"
            value={query}
            onChange={(e): void => setQuery(e.target.value)}
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
