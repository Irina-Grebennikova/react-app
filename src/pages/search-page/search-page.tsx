import { Component } from 'react';

import { Search } from '@/components/search';

import styles from './search-page.module.scss';

class SearchPage extends Component {
  render(): JSX.Element {
    return (
      <div className={styles.searchPage}>
        <h1 className={styles.title}>Dog breeds</h1>
        <Search />
      </div>
    );
  }
}

export { SearchPage };
