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
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.github.com/users/${id}`, {
      headers: {
        authorization: `Bearer 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`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) setFetchError(true);
        setGitHubUser(res);
      })
      .catch(() => setFetchError(true))
      .finally(() => setLoader(false));
  }, [id]);

  useEffect(() => {
    setLoader(true);

    if (gitHubUser) {
      fetch(`https://api.github.com/users/${gitHubUser.login}/repos`, {
        headers: {
          authorization: `Bearer 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`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) setFetchError(true);
          setGitHubUsersRepos(res);
        })
        .catch(() => setFetchError(true))
        .finally(() => setLoader(false));
    }
  }, [gitHubUser]);

  if (loader) {
    return <Loading />;
  } else if (fetchError || !gitHubUser) {
    return <CustomError />;
  }

  const convertBigNumber = (number: number) => {
    if (number >= 1000) {
      return `${Number((number / 1000).toFixed(1))}k`;
    }
    return number;
  };

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
                {gitHubUser.name ? `${gitHubUser.name},` : ''}{' '}
                <span className="user-profile__accent">{gitHubUser.login}</span>
              </h1>

              <p className="user-profile__text">
                <span className="user-profile__accent">{convertBigNumber(gitHubUser.followers)}</span>{' '}
                {pluralization(gitHubUser.followers, 'подписчиков', 'подписчик', 'подписчика')} ·{' '}
                <span className="user-profile__accent">{convertBigNumber(gitHubUser.following)}</span>{' '}
                {pluralization(gitHubUser.following, 'подписок', 'подписка', 'подписки')}
                {gitHubUser.blog ? (
                  <>
                    {' '}
                    ·{' '}
                    <a href={gitHubUser.blog} target="_blank" rel="noreferrer" className="link">
                      {gitHubUser.blog}
                    </a>
                  </>
                ) : (
                  ''
                )}
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
