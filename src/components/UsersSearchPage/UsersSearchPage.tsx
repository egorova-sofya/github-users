import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GitHubDetailedUser, GitHubUser } from '../../types';
import CustomError from '../CustomError/CustomError';
import Loading from '../Loading/Loading';
import { UsersList } from '../UsersList/UsersList';

type LocationProps = {
  pathname: string;
  state: string;
};

export const UsersSearchPage: FC = () => {
  const location = useLocation() as unknown as LocationProps;

  const [usersDetailedList, setUsersDetailedList] = useState<GitHubDetailedUser[]>([]);
  const [usersList, setUsersList] = useState<GitHubUser[]>([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/search/users?q=${location.state}`)
      .then((res) => res.json())
      .then((res) => 'login' in res && setUsersList(res.items))
      .catch(() => setFetchError(true));
  }, [location]);

  useEffect(() => {
    for (let i = 0; i <= usersList.length - 1; i++) {
      if (usersList[i]) {
        fetch(`https://api.github.com/users/${usersList[i]?.login}`)
          .then((res) => res.json())
          .then((res) => {
            setUsersDetailedList((usersDetailedList) => [...usersDetailedList, { ...res }]);
          })
          .catch(() => setFetchError(true));
      }
    }
  }, [usersList]);

  console.log(usersDetailedList);

  if (fetchError) return <CustomError />;
  if (usersDetailedList.length == 0 || usersList.length == 0) return <Loading />;

  return (
    <>
      <main>
        <div className="container">
          {usersList.length == 0 ? (
            <h1 className="title">Ничего не найдено по запросу {location.state}</h1>
          ) : (
            <h1 className="title">Пользователи по запросу {location.state}</h1>
          )}

          <UsersList usersList={usersDetailedList} />
        </div>
      </main>
    </>
  );
};
