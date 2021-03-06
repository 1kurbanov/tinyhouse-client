import React from 'react';
import { Layout } from 'antd';
import { Viewer } from '../../lib/types';
import logo from './assets/tinyhouse-logo.png';
import { Link } from 'react-router-dom';
import { MenuItem } from './components';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;

export const AppHeader = ({ viewer, setViewer }: Props) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={logo} alt="App logo" />
          </Link>
        </div>
      </div>
      <div>
        <MenuItem viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  );
};
