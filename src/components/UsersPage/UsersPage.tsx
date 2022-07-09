import React, { FC } from 'react';
import { UsersList } from '../UsersList/UsersList';

export const UsersPage: FC = () => {
  return (
    <>
      <main>
        <div className="container">
          <UsersList />
        </div>
      </main>
    </>
  );
};
