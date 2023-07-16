import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ChannelTalkBtn from './components/common/ChannelTalkBtn';
import RouteChangeTracker from './utils/RouteChangeTracker';

export default function App() {
  const [badgeCount, setBadgeCount] = useState(0);
  useEffect(() => {
    window.ChannelIO('boot', {
      pluginKey: '8fc6776f-2edc-4507-ab21-80f5b79decae',
      hideDefaultLauncher: true,
    });
    window.ChannelIO('onBadgeChanged', count => {
      setBadgeCount(count);
    });
    return () => {
      window.ChannelIO('shutdown');
    };
  }, []);

  RouteChangeTracker();
  return (
    <Wrapper>
      <ChannelTalkBtn badgeCount={badgeCount} />
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;
