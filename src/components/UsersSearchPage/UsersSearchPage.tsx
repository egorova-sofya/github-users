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
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    setUsersDetailedList([]);
    setUsersList([]);
    fetch(`https://api.github.com/search/users?q=${location.state}`);
    // .then((res) => res.json())
    // .then((res) => {
    //   if (res.message) setFetchError(true);
    //   setUsersList(res.items);
    // })
    // .catch(() => setFetchError(true))
    // .finally(() => setLoader(false));
  }, [location]);

  useEffect(() => {
    for (let i = 0; i <= usersList.length - 1; i++) {
      if (usersList[i]) {
        setLoader(true);
        fetch(`https://api.github.com/users/${usersList[i]?.login}`);
        // .then((res) => res.json())
        // .then((res) => {
        //   if (res.message) setFetchError(true);
        //   setUsersDetailedList((usersDetailedList) => [...usersDetailedList, { ...res }]);
        // })

        // .catch(() => setFetchError(true))
        // .finally(() => {
        //   setLoader(false);
        // });
      }
    }
  }, [usersList]);

  if (loader) {
    <Loading />;
  } else if (fetchError) {
    <CustomError />;
  }

  return (
    <>
      <main>
        <div className="container">
          {usersList.length == 0 && !loader ? (
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
