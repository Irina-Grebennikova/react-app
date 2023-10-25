import { Component } from 'react';

import magnifier from '@/assets/icons/magnifier.svg';
import { Button } from '@/components/button';

import styles from './search.module.scss';

class Search extends Component {
  render(): JSX.Element {
    return (
      <>
        <div className={styles.search}>
          <div className={styles.inputBox}>
            <img className={styles.searchIcon} src={magnifier} alt="Search"></img>
            <input className={styles.searchInput} placeholder="Example: pug, labrador" autoFocus />
            <div className={styles.clearIcon}></div>
          </div>
          <Button>Search</Button>
        </div>
      </>
    );
  }
}

export { Search };
