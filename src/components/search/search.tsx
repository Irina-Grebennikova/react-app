import { Component } from 'react';

import magnifier from '@/assets/icons/magnifier.svg';
import { Button } from '@/components/button';
import { LocalStore } from '@/helpers/local-store';
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
    this.props.updateBreeds(this.state.searchQuery.trim());
  }

  render(): JSX.Element {
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

  private handleSearchBtnClick = async (): Promise<void> => {
    const newQuery = this.state.searchQuery.trim();
    LocalStore.setItem('search-query', newQuery);
    this.props.updateBreeds(newQuery);
  };

  private handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter') {
      this.handleSearchBtnClick();
    }
  };

  private handleClearBtnClick = async (): Promise<void> => {
    this.setState({ searchQuery: '' });
    LocalStore.removeItem('search-query');
    this.props.updateBreeds('');
  };
}

export { Search };
