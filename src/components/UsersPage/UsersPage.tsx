import React, { FC, useEffect, useState } from 'react';
import { GitHubUser, GitHubDetailedUser } from '../../types';
import CustomError from '../CustomError/CustomError';
import Loading from '../Loading/Loading';
import { UsersList } from '../UsersList/UsersList';

export const UsersPage: FC = () => {
  const [usersDetailedList, setUsersDetailedList] = useState<GitHubDetailedUser[]>([]);
  const [usersList, setUsersList] = useState<GitHubUser[]>([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users', {
      headers: {
        authorization: `Bearer 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`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) setFetchError(true);
        setUsersList(res);
      })
      .catch(() => setFetchError(true));
  }, []);

  useEffect(() => {
    for (let i = 0; i <= usersList.length - 1; i++) {
      fetch(`https://api.github.com/users/${usersList[i]?.login}`, {
        headers: {
          authorization: `Bearer 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`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) setFetchError(true);
          setUsersDetailedList((usersDetailedList) => [...usersDetailedList, { ...res }]);
        })
        .catch(() => setFetchError(true));
    }
  }, [usersList]);

  if (fetchError) return <CustomError />;
  if (usersDetailedList.length == 0 || usersList.length == 0) return <Loading />;

  return (
    <>
      <main>
        <div className="container">
          <UsersList usersList={usersDetailedList} />
        </div>
      </main>
    </>
  );
};
