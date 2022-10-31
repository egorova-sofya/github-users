import React, { FC } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from '../Header/Header';
import Test from '../Test';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';

export const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<UsersPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/search" element={<UsersSearchPage />} />
        {/* TODO delete me */}
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
