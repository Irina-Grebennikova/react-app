import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useGetBreedQuery } from '@/api';
import { Loader } from '@/components/ui';
import { selectFromSearch, setIsDetailsOpen } from '@/store';

import styles from './dog-breed-details.module.scss';

function DogBreedDetails(): JSX.Element {
  const { breedId, isDetailsLoading: isLoading } = useSelector(selectFromSearch);

  const [isOpen, setIsOpen] = useState(true);

  const { data: breed } = useGetBreedQuery(breedId);

  const infoPanel = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsDetailsOpen(true));

    document.addEventListener('click', handleOutsideClick);

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
    dispatch(setIsDetailsOpen(false));
  };

  return (
    <aside className={styles.wrapper}>
      <section className={styles.characterInfo} ref={infoPanel}>
        {!isOpen && <Navigate to={'/'} />}
        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <div className={styles.content}>
            <h1 className={styles.name}>{breed?.name}</h1>
            <img className={styles.image} src={breed?.image} alt="" width={300} height={300} />
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
        <button className={styles.closeItem} onClick={closeSidePanel}>
          <span className={styles.closeIcon}></span>
        </button>
      </section>
    </aside>
  );
}

export { DogBreedDetails };
