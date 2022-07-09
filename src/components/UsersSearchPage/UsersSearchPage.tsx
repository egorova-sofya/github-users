import React, { FC } from 'react';
import { UsersList } from '../UsersList/UsersList';

export const UsersSearchPage: FC = () => {
  return (
    <>
      <main>
        <div className="container">
          <h1 className="title">Пользователи по запросу defunkt</h1>
          <UsersList />
        </div>
      </main>
    </>
  );
};
