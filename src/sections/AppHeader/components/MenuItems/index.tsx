import React from 'react';
import { Avatar, Button, Menu } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Viewer } from '../../../../lib/types';
import { LOG_OUT } from '../../../../lib/graphql/mutations';
import { LogOut as LogOutData } from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import { displayErrorMessage, displaySuccessNotification } from '../../../../lib/utils';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Item, SubMenu } = Menu;

export const MenuItem = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: data => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem('token');
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: () => {
      displayErrorMessage("Sorry! We weren't able to log you out. Please try again later!");
    },
  });

  const handleLogOut = () => {
    logOut();
  };

  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu key="submenu" title={<Avatar src={viewer.avatar} />}>
        <Item key="/user" icon={<UserOutlined />}>
          <Link to={`/user/${viewer.id}`}>Profile</Link>
        </Item>
        <Item key="/logout" icon={<LogoutOutlined />} onClick={handleLogOut}>
          Log out
        </Item>
      </SubMenu>
    ) : (
      <Item key="/login">
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    );

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host" icon={<HomeOutlined />}>
        <Link to="/host">Host</Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
