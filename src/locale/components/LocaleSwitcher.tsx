import React, { FC, useState, useRef } from 'react';
import './LocaleSwitcherDesktop.css';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { useLocale } from '../hooks';
import { LocaleSwitcherButton } from './LocaleSwitcherButton';
import { LocaleSwitcherMenu } from './LocaleSwitcherMenu';

const LocaleSwitcher = () => {
  const { locale, setLocale } = useLocale();
  const [dropdownShown, setDropdownShown] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="locale-switcher">
      <LocaleSwitcherButton
        onClick={(event) => {
          event.stopPropagation();
          setDropdownShown(!dropdownShown);
        }}
        ref={targetRef}
        locale={locale}
        opened={dropdownShown}
      />
      <Dropdown shown={dropdownShown} onShownChange={setDropdownShown} targetRef={targetRef}>
        <LocaleSwitcherMenu
          className="locale-switcher__dropdown-menu"
          selectedLocale={locale}
          onChangeLocale={(locale) => setLocale(locale)}
        />
      </Dropdown>
    </div>
  );
};

export default LocaleSwitcher;
