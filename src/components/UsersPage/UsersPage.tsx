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
    fetch('https://api.github.com/users')
      .then((res) => res.json())
      .then((res) => setUsersList(res))
      .catch(() => setFetchError(true));
  }, []);

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
    <>
      <main>
        <div className="container">
          <UsersList usersList={usersDetailedList} />
        </div>
      </main>
    </>
  );
};
