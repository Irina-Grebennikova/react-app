import { Component } from 'react';

import { getBreeds } from '@/api';
import Cards from '@/components/cards/cards';
import { Search } from '@/components/search';
import { Breed } from '@/types';

import styles from './search-page.module.scss';

type SearchPageState = {
  breeds: Breed[];
};

class SearchPage extends Component {
  public state: SearchPageState = {
    breeds: [],
  };

  render(): JSX.Element {
    return (
      <div className={styles.searchPage}>
        <h1 className={styles.title}>Dog breeds</h1>
        <Search updateBreeds={this.updateBreeds.bind(this)} />
        <Cards breeds={this.state.breeds} />
      </div>
    );
  }

  private async updateBreeds(query: string): Promise<Breed[]> {
    const breeds = await getBreeds(query);
    this.setState({ breeds });
    return breeds;
  }
}

export { SearchPage };
