import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import styled, { useTheme } from 'styled-components';
import { ReactComponent as Hamburger } from 'styles/sidebarIcon/hamburger.svg';

import Header from './header/Header';
import Sidebar from './Sidebar';
import { getEncryptionStorage } from 'utils/encryptionStorage';

import ROUTER from 'constants/routerConst';
import STRING from 'constants/string';

export default function DashBoardLayout() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { pathname } = useLocation();
  const { checkUser, isAdmin, userRole } = getEncryptionStorage();
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);

  useEffect(() => {
    if (userRole === 'MASTER') {
      navigate(ROUTER.PATH.MASTER.APPOINTMENT);
    } else if (!checkUser) {
      navigate(ROUTER.PATH.MAIN);
    }
  }, [checkUser, navigate, userRole]);

  const desktopSize = theme.screen.desktopSize;
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= desktopSize) {
        setIsSidebarHidden(true);
      } else {
        setIsSidebarHidden(false);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [setIsSidebarHidden, desktopSize]);

  const isAdminStr = STRING.IS_ADMIN(isAdmin);

  const handleSidebarToggle = useCallback(e => {
    e.stopPropagation();
    setIsSidebarHidden(prev => !prev);
  }, []);

  const handleClickCategory = e => {
    const name = e.target.innerText;
    if (!name) {
      let targetPath = '';
      if (isAdmin) {
        targetPath = ROUTER.PATH.ADMIN.DASHBOARD;
      } else if (userRole === 'MASTER') {
        targetPath = ROUTER.PATH.MAIN;
      } else {
        targetPath = ROUTER.PATH.USER.DASHBOARD;
      }
      navigate(targetPath);
    }
    const routerPathArray = Object.values(ROUTER.PATH[isAdminStr]);
    const index = Object.values(STRING.SIDEBAR[isAdminStr]).findIndex(
      sidebarName => sidebarName === name
    );
    if (index >= 0) {
      navigate(routerPathArray[index]);
    }
    setIsSidebarHidden(prev => !prev);
  };

  return (
    <>
      {userRole && (
        <LayoutWrapper>
          <SidebarBtnContainer onClick={handleSidebarToggle}>
            <HamburgerIcon hide={`${isSidebarHidden}`} />
          </SidebarBtnContainer>

          <Header
            isSidebarHidden={isSidebarHidden}
            setIsSidebarHidden={setIsSidebarHidden}
            userRole={userRole}
            isAdmin={isAdmin}
          />

          <Sidebar
            isSidebarHidden={isSidebarHidden}
            setIsSidebarHidden={setIsSidebarHidden}
            handleClickCategory={handleClickCategory}
            isAdmin={isAdmin}
            userRole={userRole}
            isAdminStr={isAdminStr}
            pathname={pathname}
            handleSidebarToggle={handleSidebarToggle}
          />
          <OutletContainer>
            <Outlet />
          </OutletContainer>
        </LayoutWrapper>
      )}
    </>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const OutletContainer = styled.div`
  width: calc(100% - 12.5rem);
  height: 100%;
  max-height: 100vh;
  min-width: 52.5rem;
  margin-left: auto;
  padding: 9.375rem 3.75rem 3.4375rem 3.75rem;
  background-color: ${props => props.theme.color.blue.brandColor1};
  @media (max-width: ${props => props.theme.screen.desktop}) {
    width: calc(100vw);
  }
`;

const SidebarBtnContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  height: 6.25rem;
  z-index: 1001;
  margin-left: 2rem;
  @media (max-width: ${props => props.theme.screen.desktopSize}) {
    transform: ${props => (props.hide === 'true' ? 'none' : 'block')};
  }
`;

const HamburgerIcon = styled(Hamburger)`
  animation: 0.2s linear 0s 1 normal none running crbsY;
  opacity: 1;
  display: ${props => (props.hide === 'true' ? 'block' : 'none')};
  transition: opacity 0.3s linear 0s;
  path {
    stroke: white;
  }
  ${props => props.theme.CursorActive};
`;
