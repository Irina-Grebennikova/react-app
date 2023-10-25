import { Component } from 'react';

import { classNames } from '@/helpers';
import styles from '@/index.module.scss';

type Props = {
  className?: string;
  onClick?: () => void;
  children?: JSX.Element | JSX.Element[] | string;
};

class Button extends Component<Props> {
  render(): JSX.Element {
    const { className = '', onClick, children } = this.props;

    return (
      <button className={classNames(styles.button, className)} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export { Button };
