import React from 'react';
import { Outlet } from 'react-router-dom';
import MainSidebar from './MainSidebar';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <MainSidebar/>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
