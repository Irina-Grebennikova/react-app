import { Component, ReactNode } from 'react';

import { dogBreedsApi } from '@/api';
import { DogBreedsList } from '@/components/dog-breeds-list';
import { Search } from '@/components/search';
import { Button } from '@/components/ui';
import { Breed } from '@/types';

import styles from './search-page.module.scss';

type SearchPageState = {
  breeds: Breed[];
  isLoading: boolean;
};

class SearchPage extends Component {
  public state: SearchPageState = {
    breeds: [],
    isLoading: true,
  };

  render(): ReactNode {
    return (
      <div className={styles.searchPage}>
        <header className={styles.header}>
          <Button className={styles.errorBtn} color={'red'} onClick={this.throwError.bind(this)}>
            Error
          </Button>
        </header>
        <h1 className={styles.title}>Dog breeds</h1>
        <Search updateBreeds={this.updateBreeds.bind(this)} />
        <DogBreedsList breeds={this.state.breeds} isLoading={this.state.isLoading} />
      </div>
    );
  }

  private async updateBreeds(query: string): Promise<Breed[]> {
    this.setState(() => {
      return { isLoading: true };
    });
    const breeds = await dogBreedsApi.getBreeds(query);
    this.setState(() => {
      return { breeds, isLoading: false };
    });
    return breeds;
  }

  private throwError(): void {
    try {
      throw new Error();
    } catch {
      this.setState(() => {
        throw new Error('Error button is clicked');
      });
    }
  }
}

export { SearchPage };
