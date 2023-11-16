import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { classNames } from '@/helpers';

import styles from './pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
};

function Pagination({ currentPage, pageCount }: PaginationProps): ReactElement {
  const isFirstPage = (): boolean => currentPage === 1;
  const isLastPage = (): boolean => currentPage === pageCount;

  return (
    <div className={styles.pagination}>
      <Link to={`?page=1`} className={classNames(styles.button, isFirstPage() ? styles.inactive : '')}>
        {'<<'}
      </Link>
      <Link to={`?page=${currentPage - 1}`} className={classNames(styles.button, isFirstPage() ? styles.inactive : '')}>
        {'<'}
      </Link>
      <div className={classNames(styles.button, styles.current)}>{currentPage}</div>
      <Link to={`?page=${currentPage + 1}`} className={classNames(styles.button, isLastPage() ? styles.inactive : '')}>
        {'>'}
      </Link>
      <Link to={`/?page=${pageCount}`} className={classNames(styles.button, isLastPage() ? styles.inactive : '')}>
        {'>>'}
      </Link>
    </div>
  );
}

export { Pagination };
