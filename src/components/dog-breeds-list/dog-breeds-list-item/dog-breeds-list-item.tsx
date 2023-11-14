import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { LocalStore, classNames } from '@/helpers';
import { selectFromSearch, setBreedId } from '@/store';
import { Breed } from '@/types';

import styles from './dog-breeds-list-item.module.scss';

type DogBreedsListItemProps = {
  breed: Breed;
};

function DogBreedsListItem({ breed }: DogBreedsListItemProps): ReactElement {
  const { isDetailsOpen, breedId, currentPage } = useSelector(selectFromSearch);

  const dispatch = useDispatch();

  const getClassForCard = (): string =>
    classNames(styles.card, isDetailsOpen && breedId === breed.id ? styles.activeCard : '');

  function handleListItemClick(e: React.MouseEvent): void {
    if (!isDetailsOpen) {
      e.stopPropagation();
    }
    LocalStore.setItem('breed-id', String(breed.id));
    dispatch(setBreedId(breed.id));
  }

  return (
    <Link
      to={`/details/?id=${breed.id}&page=${currentPage}`}
      className={getClassForCard()}
      onClick={handleListItemClick}
      data-testid={`card-${breed.id}`}
    >
      <img className={styles.image} src={breed.image} width={300} height={300} alt="" />
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
