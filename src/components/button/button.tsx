import { Component } from 'react';

import { classNames } from '@/helpers';

import styles from './button.module.scss';

enum ButtonColor {
  Red = 'redButton',
  Blue = 'blueButton',
}

type Props = {
  color?: ButtonColor;
  className?: string;
  onClick?: () => void;
  children?: JSX.Element | JSX.Element[] | string;
};

class Button extends Component<Props> {
  render(): JSX.Element {
    const { color = ButtonColor.Blue, className = '', onClick, children } = this.props;

    return (
      <button className={classNames(styles[color], className)} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export { Button, ButtonColor };
