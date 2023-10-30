import { Component, ReactNode } from 'react';

import magnifier from '@/assets/icons/magnifier.svg';
import { Button } from '@/components/ui';
import { LocalStore } from '@/helpers';
import { Breed } from '@/types';

import styles from './search.module.scss';

type SearchProps = {
  updateBreeds: (query: string) => Promise<Breed[]>;
};

class Search extends Component<SearchProps> {
  state = {
    searchQuery: LocalStore.getItem<string>('search-query') || '',
  };

  async componentDidMount(): Promise<void> {
    await this.props.updateBreeds(this.state.searchQuery.trim());
  }

  render(): ReactNode {
    return (
      <>
        <div className={styles.search}>
          <div className={styles.inputBox}>
            <img className={styles.searchIcon} src={magnifier} alt="Search"></img>
            <input
              className={styles.searchInput}
              placeholder="Example: pug, labrador"
              value={this.state.searchQuery}
              onChange={this.updateSearchQuery}
              onKeyDown={this.handleEnterPress}
              autoFocus
            />
            <div className={styles.clearIcon} onClick={this.handleClearBtnClick}></div>
          </div>
          <Button onClick={this.handleSearchBtnClick}>Search</Button>
        </div>
      </>
    );
  }

  private updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>): string => {
    const newQuery = e.target.value;
    this.setState({ searchQuery: newQuery });
    return newQuery;
  };

  private handleSearchBtnClick = (): void => {
    const newQuery = this.state.searchQuery.trim();
    LocalStore.setItem('search-query', newQuery);
    void this.props.updateBreeds(newQuery);
  };

  private handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      void this.handleSearchBtnClick();
    }
  };

  private handleClearBtnClick = (): void => {
    this.setState({ searchQuery: '' });
    LocalStore.removeItem('search-query');
    void this.props.updateBreeds('');
  };
}

export { Search };
