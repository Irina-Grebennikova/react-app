import { Component } from 'react';

import { getBreeds } from '@/api';
import { Button, ButtonColor } from '@/components/button/button';
import Cards from '@/components/cards/cards';
import { Search } from '@/components/search';
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

  render(): JSX.Element {
    return (
      <div className={styles.searchPage}>
        <header className={styles.header}>
          <Button className={styles.errorBtn} color={ButtonColor.Red} onClick={this.throwError.bind(this)}>
            Error
          </Button>
        </header>
        <h1 className={styles.title}>Dog breeds</h1>
        <Search updateBreeds={this.updateBreeds.bind(this)} />
        <Cards breeds={this.state.breeds} isLoading={this.state.isLoading} />
      </div>
    );
  }

  private async updateBreeds(query: string): Promise<Breed[]> {
    this.setState({ isLoading: true });
    const breeds = await getBreeds(query);
    this.setState({ breeds, isLoading: false });
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
