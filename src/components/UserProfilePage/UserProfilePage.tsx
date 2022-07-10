import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GitHubDetailedUser, GitHubUsersRepo } from '../../types';
import { pluralization } from '../../utils';
import CustomError from '../CustomError/CustomError';
import Loading from '../Loading/Loading';
import './UserProfilePage.css';

export const UserProfilePage: FC = () => {
  const { id } = useParams();
  const [gitHubUser, setGitHubUser] = useState<GitHubDetailedUser | null>(null);
  const [gitHubUsersRepos, setGitHubUsersRepos] = useState<GitHubUsersRepo[] | null>(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((res) => res.json())
      .then((res) => setGitHubUser(res))
      .catch(() => setFetchError(true));
  }, [id]);

  useEffect(() => {
    if (gitHubUser) {
      fetch(`https://api.github.com/users/${gitHubUser.id}/repos`)
        .then((res) => res.json())
        .then((res) => setGitHubUsersRepos(res))
        .catch(() => setFetchError(true));
    }
  }, [gitHubUser]);

  if (!gitHubUser) return <Loading />;
  if (fetchError) return <CustomError />;

  return (
    <>
      <main>
        <div className="container">
          <section className="user-profile">
            <div className="user-profile__image-container">
              <img
                className="user-profile__image"
                src={gitHubUser.avatar_url}
                alt={`${gitHubUser.login} profile photo`}
              />
            </div>
            <div className="user-profile__content">
              <h1 className="user-profile__title">
                {gitHubUser.name}, <span className="user-profile__accent">{gitHubUser.login}</span>
              </h1>
              <p className="user-profile__text">
                <span className="user-profile__accent">{gitHubUser.followers}k</span>{' '}
                {pluralization(gitHubUser.followers, 'подписок', 'подписка', 'подписки')} ·{' '}
                <a href={gitHubUser.blog} target="_blank" rel="noreferrer" className="link">
                  {gitHubUser.blog}
                </a>
              </p>
            </div>
          </section>

          <section className="repository-list">
            <div className="repository-list__header">
              <h2 className="repository-list__title">Репозитории</h2>
              <a href={`${gitHubUser.html_url}?tab=repositories`} className="link" target="_blank" rel="noreferrer">
                Все репозитории
              </a>
            </div>

            <div className="repository-list__container">
              {gitHubUsersRepos?.length == 0 && <p>Нет репозиториев</p>}
              {gitHubUsersRepos &&
                gitHubUsersRepos.map((item) => (
                  <section className="repository-list__item" key={item.id}>
                    <h3 className="repository-list__item-title">
                      <a target="_blank" rel="noreferrer" href={item.html_url} className="link">
                        {item.name}
                      </a>
                    </h3>
                    <p className="repository-list__item-text">{item.description}</p>
                  </section>
                ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
