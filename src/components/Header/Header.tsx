import React, { FC, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

export const Header: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();

  type LocationProps = {
    pathname: string;
    state: string;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchValue.trim().length) {
      return;
    }
    navigate(`../search?query=${searchValue}`, { state: searchValue });
  };

  return (
    <header className="header">
      <div className="container header__container">
        <nav className="header__navigation">
          <ul className="header__navigation-list">
            <li className="header__navigation-list-item">
              <a
                href="/"
                onClick={(event) => location.pathname === '/' && event.preventDefault()}
                className="header__navigation-link"
              >
                Пользователи гитхаба
              </a>
            </li>
            {location.state && (
              <li className="header__navigation-list-item">
                <a className="header__navigation-link header__navigation-link--user">{location.state}</a>
              </li>
            )}
          </ul>
        </nav>

        <div className="header__search">
          <form className="header__search-form" onSubmit={onSubmit}>
            <input
              type="search"
              className="header__search-input"
              placeholder="Поиск пользователя"
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
            <button type="submit" className="header__search-button">
              Найти
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
