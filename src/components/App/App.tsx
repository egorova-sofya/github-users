import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from '../Header/Header';
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
        <Route path="/search?query=:id" element={<UsersSearchPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
