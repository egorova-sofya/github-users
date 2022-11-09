import React, { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';
import './LocaleSwitcherButton.css';
import arrow from './../../images/arrow.svg';
import { Locale } from '../types';

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
  locale: Locale;
  opened?: boolean;
}

export const LocaleSwitcherButton = forwardRef(function LocaleSwitcherButton(
  { onClick, locale, opened }: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      className={classNames('locale-switcher-button', { 'locale-switcher-button--opened': opened })}
      ref={ref}
      onClick={onClick}
    >
      <span className="locale-switcher-button__text">
        {locale === 'en' && 'ENG'}
        {locale === 'ru' && 'RU'}
      </span>
      <span className="locale-switcher-button__icon">
        <img src={arrow} alt="" />
      </span>
    </button>
  );
});
