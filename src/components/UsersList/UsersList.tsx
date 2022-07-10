import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GitHubUser, GitHubDetailedUser } from '../../types';
import { pluralization } from '../../utils';
import CustomError from '../CustomError/CustomError';
import Loading from '../Loading/Loading';
import './UsersList.css';

export const UsersList: FC = () => {
  const [usersDetailedList, setUsersDetailedList] = useState<GitHubDetailedUser[]>([]);
  const [usersList, setUsersList] = useState<GitHubUser[]>([
    {
      login: 'ezmobius',
      id: 5,
      node_id: 'MDQ6VXNlcjU=',
      avatar_url: 'https://avatars.githubusercontent.com/u/5?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/ezmobius',
      html_url: 'https://github.com/ezmobius',
      followers_url: 'https://api.github.com/users/ezmobius/followers',
      following_url: 'https://api.github.com/users/ezmobius/following{/other_user}',
      gists_url: 'https://api.github.com/users/ezmobius/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/ezmobius/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/ezmobius/subscriptions',
      organizations_url: 'https://api.github.com/users/ezmobius/orgs',
      repos_url: 'https://api.github.com/users/ezmobius/repos',
      events_url: 'https://api.github.com/users/ezmobius/events{/privacy}',
      received_events_url: 'https://api.github.com/users/ezmobius/received_events',
      type: 'User',
      site_admin: false,
    },
    {
      login: 'caged',
      id: 25,
      node_id: 'MDQ6VXNlcjI1',
      avatar_url: 'https://avatars.githubusercontent.com/u/25?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/caged',
      html_url: 'https://github.com/caged',
      followers_url: 'https://api.github.com/users/caged/followers',
      following_url: 'https://api.github.com/users/caged/following{/other_user}',
      gists_url: 'https://api.github.com/users/caged/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/caged/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/caged/subscriptions',
      organizations_url: 'https://api.github.com/users/caged/orgs',
      repos_url: 'https://api.github.com/users/caged/repos',
      events_url: 'https://api.github.com/users/caged/events{/privacy}',
      received_events_url: 'https://api.github.com/users/caged/received_events',
      type: 'User',
      site_admin: false,
    },
    {
      login: 'pjhyett',
      id: 3,
      node_id: 'MDQ6VXNlcjM=',
      avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/pjhyett',
      html_url: 'https://github.com/pjhyett',
      followers_url: 'https://api.github.com/users/pjhyett/followers',
      following_url: 'https://api.github.com/users/pjhyett/following{/other_user}',
      gists_url: 'https://api.github.com/users/pjhyett/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/pjhyett/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/pjhyett/subscriptions',
      organizations_url: 'https://api.github.com/users/pjhyett/orgs',
      repos_url: 'https://api.github.com/users/pjhyett/repos',
      events_url: 'https://api.github.com/users/pjhyett/events{/privacy}',
      received_events_url: 'https://api.github.com/users/pjhyett/received_events',
      type: 'User',
      site_admin: false,
    },
  ]);
  const [fetchError, setFetchError] = useState(false);

  // useEffect(() => {
  //   fetch('https://api.github.com/users')
  //     .then((res) => res.json())
  //     .then((res) => setUsersList(res))
  // .catch(() => setFetchError(true));
  // }, []);

  useEffect(() => {
    for (let i = 0; i <= usersList.length - 1; i++) {
      fetch(`https://api.github.com/users/${usersList[i]?.login}`)
        .then((res) => res.json())
        .then((res) => {
          setUsersDetailedList((usersDetailedList) => [...usersDetailedList, { ...res }]);
        })
        .catch(() => setFetchError(true));
    }
  }, [usersList]);

  if (usersDetailedList.length == 0 || usersList.length == 0) return <Loading />;
  if (fetchError) return <CustomError />;

  return (
    <div className="users-list">
      {usersDetailedList.map((item) => (
        <section className="users-list__item" key={item.id}>
          <div className="users-list__image-container">
            <img className="users-list__image" src={item.avatar_url} alt={`${item.login} profile photo`} />
          </div>
          <div className="users-list__content">
            <h2 className="users-list__title">
              <Link className="link" to={`/users/${item.login}`}>
                {item.login}
              </Link>
              , {item.public_repos} {pluralization(item.public_repos, 'репозиториев', 'репозиторий', 'репозитория')}
            </h2>
            <p className="users-list__text">{item.company}</p>
          </div>
        </section>
      ))}
    </div>
  );
};
