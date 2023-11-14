import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { classNames } from '@/helpers';
import { selectFromSearch } from '@/store';

import styles from './pagination.module.scss';

type PaginationProps = {
  pageCount: number;
};

function Pagination(props: PaginationProps): ReactElement {
  const { pageCount } = props;
  const { currentPage } = useSelector(selectFromSearch);

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
