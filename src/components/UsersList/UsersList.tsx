import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { GitHubDetailedUser } from '../../types';
import { pluralization } from '../../utils';

import './UsersList.css';

interface Props {
  usersList: GitHubDetailedUser[];
}

export const UsersList: FC<Props> = ({ usersList }) => {
  return (
    <li className="users-list">
      {usersList.map((item) => (
        <div className="users-list__item" key={item.id}>
          <div className="users-list__image-container">
            <img className="users-list__image" src={item.avatar_url} alt={`${item.login} profile photo`} />
          </div>
          <div className="users-list__content">
            <h2 className="users-list__title">
              <Link className="link" to={`/users/${item.login}`} state={item.login}>
                {item.login}
              </Link>
              {item.public_repos > 0 &&
                `, ${item.public_repos} ${pluralization(
                  item.public_repos,
                  'репозиториев',
                  'репозиторий',
                  'репозитория'
                )}`}
            </h2>
            <p className="users-list__text">{item.company}</p>
          </div>
        </div>
      ))}
    </li>
  );
};
