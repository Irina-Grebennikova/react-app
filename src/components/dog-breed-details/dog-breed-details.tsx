import { useContext, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { dogBreedsApi } from '@/api';
import { Loader } from '@/components/ui';
import { SearchPageContext } from '@/pages/search-page';
import { Breed } from '@/types';

import styles from './dog-breed-details.module.scss';

function DogBreedDetails(): JSX.Element {
  const { breedId, setIsDetailsOpen } = useContext(SearchPageContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [breed, setBreed] = useState<Breed>();

  const infoPanel = useRef<HTMLDivElement>(null);

  const imageSrc = dogBreedsApi.getImageSrc(breed?.image || '');

  useEffect(() => {
    setIsDetailsOpen(true);

    document.addEventListener('click', handleOutsideClick);

    void dogBreedsApi.getBreed(breedId).then((breed) => {
      if (breed) {
        setBreed(breed);
        setIsLoading(false);
      }
    });
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  function handleOutsideClick({ target }: MouseEvent): void {
    if (target instanceof HTMLElement && !infoPanel.current?.contains(target)) {
      closeSidePanel();
    }
  }

  const closeSidePanel = (): void => {
    setIsOpen(false);
    setIsDetailsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.characterInfo} ref={infoPanel}>
        {!isOpen && <Navigate to={'/'} />}
        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <div className={styles.content}>
            <h1 className={styles.name}>{breed?.name}</h1>
            <img className={styles.image} src={imageSrc} alt="" width={300} height={300} />
            <div className={styles.details}>
              <p className={styles.detailsLine}>
                <span className={styles.label}>Country:</span> {breed?.country}
              </p>
              <p className={styles.detailsLine}>
                <span className={styles.label}>Height:</span> {breed?.height}
              </p>
              <p className={styles.detailsLine}>
                <span className={styles.label}>Weight:</span> {breed?.weight}
              </p>
              <p className={styles.detailsLine}>
                <span className={styles.label}>Wool:</span> {breed?.wool}
              </p>
              <p className={styles.detailsLine}>
                <span className={styles.label}>Color:</span> {breed?.color}
              </p>
              <p className={styles.detailsLine}>
                <span className={styles.label}>Group:</span> {breed?.group}
              </p>
            </div>
          </div>
        )}
        <div className={styles.closeItem} onClick={closeSidePanel}>
          <div className={styles.closeIcon}></div>
        </div>
      </section>
    </div>
  );
}

export { DogBreedDetails };
