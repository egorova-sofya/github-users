import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GitHubUser, GitHubDetailedUser } from '../../types';
import CustomError from '../CustomError/CustomError';
import Loading from '../Loading/Loading';
import { UsersList } from '../UsersList/UsersList';

export const UsersPage: FC = () => {
  const [usersDetailedList, setUsersDetailedList] = useState<GitHubDetailedUser[]>([]);
  const [usersList, setUsersList] = useState<GitHubUser[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch('https://api.github.com/users');
    // .then((res) => res.json())
    // .then((res) => {
    //   if (res.message) setFetchError(true);
    //   setUsersList(res);
    // })
    // .catch(() => setFetchError(true))
    // .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    for (let i = 0; i <= usersList.length - 1; i++) {
      setLoader(true);
      // fetch(`https://api.github.com/users/${usersList[i]?.login}`)
      //   .then((res) => res.json())
      //   .then((res) => {
      //     if (res.message) setFetchError(true);
      //     setUsersDetailedList((usersDetailedList) => [...usersDetailedList, { ...res }]);
      //   })
      //   .catch(() => setFetchError(true))
      //   .finally(() => setLoader(false));
    }
  }, [usersList]);

  if (loader) {
    <Loading />;
  } else if (fetchError) {
    <CustomError />;
  }

  return (
    <>
      {/* TODO delete me */}
      <Link to="/test">TEST</Link>
      <main>
        <div className="container">
          <UsersList usersList={usersDetailedList} />
        </div>
      </main>
    </>
  );
};
