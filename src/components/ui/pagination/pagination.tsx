import { ReactNode } from 'react';

import { classNames } from '@/helpers';

import styles from './pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageCount: number;
};

function Pagination(props: PaginationProps): ReactNode {
  const { currentPage, setCurrentPage, pageCount } = props;

  const goToFirstPage = (): void => setCurrentPage(1);
  const goToPrevPage = (): void => setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  const goToNextPage = (): void => setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  const goToLastPage = (): void => setCurrentPage(pageCount);

  const isFirstPage = (): boolean => currentPage === 1;
  const isLastPage = (): boolean => currentPage === pageCount;

  return (
    <div className={styles.pagination}>
      <button className={classNames(styles.button, isFirstPage() ? styles.inactive : '')} onClick={goToFirstPage}>
        {'<<'}
      </button>
      <button className={classNames(styles.button, isFirstPage() ? styles.inactive : '')} onClick={goToPrevPage}>
        {'<'}
      </button>
      <div className={classNames(styles.button, styles.current)}>{currentPage}</div>
      <button className={classNames(styles.button, isLastPage() ? styles.inactive : '')} onClick={goToNextPage}>
        {'>'}
      </button>
      <button className={classNames(styles.button, isLastPage() ? styles.inactive : '')} onClick={goToLastPage}>
        {'>>'}
      </button>
    </div>
  );
}

export { Pagination };
