import { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';

import { dogBreedsApi } from '@/api/dog-breeds-api';
import { LocalStore, classNames } from '@/helpers';
import { SearchPageContext } from '@/pages/search-page';
import { Breed } from '@/types';

import styles from './dog-breeds-list.module.scss';

type DogBreedsListItemProps = {
  breed: Breed;
};

function DogBreedsListItem({ breed }: DogBreedsListItemProps): ReactNode {
  const { currentPage, isDetailsOpen, breedId, setBreedId } = useContext(SearchPageContext);

  const getClassForCard = (): string =>
    classNames(styles.card, isDetailsOpen && breedId === breed.id ? styles.activeCard : '');

  function handleListItemClick(e: React.MouseEvent): void {
    if (!isDetailsOpen) {
      e.stopPropagation();
    }
    LocalStore.setItem('breed-id', String(breed.id));
    setBreedId(breed.id);
  }

  return (
    <Link
      to={`/details/?id=${breed.id}&page=${currentPage}`}
      className={getClassForCard()}
      onClick={handleListItemClick}
    >
      <img className={styles.image} src={dogBreedsApi.getImageSrc(breed.image)} width={300} height={300} alt="" />
      <div className={styles.description}>
        <h3 className={styles.nameInfo}>
          Breed: <span className={styles.name}>{breed.name}</span>
        </h3>
        <p className={styles.countryInfo}>
          Country: <span className={styles.country}>{breed.country}</span>
        </p>
      </div>
    </Link>
  );
}

export { DogBreedsListItem };
