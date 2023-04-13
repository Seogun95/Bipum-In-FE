import React, { useEffect } from 'react';
import styled from 'styled-components';

import SecondPage from './SecondPage';
import FirstPage from './FirstPage';
import ThirdPage from './ThirdPage';
import FourthPage from './FourthPage';
import FifthPage from './FifthPage';
import SixthPage from './SixthPage';
import SeventhPage from './SeventhPage';
import EighthPage from './EighthPage';
import NinthPage from './NinthPage';
import TenthPage from './TenthPage';
import EleventhPage from './EleventhPage';
import { ReactComponent as ScrollUp } from 'styles/commonIcon/scrollUp.svg';
export default function RendingScrollPage({
  pageIndex,
  setPageCount,
  onclick,
  setPageIndex,
}) {
  const pages = [
    <FirstPage setPageIndex={setPageIndex} />,
    <SecondPage />,
    <ThirdPage />,
    <FourthPage />,
    <FifthPage />,
    <SixthPage />,
    <SeventhPage />,
    <EighthPage />,
    <NinthPage />,
    <TenthPage />,
    <EleventhPage />,
  ];

  useEffect(() => {
    setPageCount(pages.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollContainer pageIndex={pageIndex}>
      {pages.map((page, index) => (
        <FadeInPage key={index} visible={index === pageIndex}>
          {page}
          {(index === 10 || index === 6) && (
            <ScrollToTopContainer>
              <ScrollToTopIcon onClick={onclick} />
            </ScrollToTopContainer>
          )}
        </FadeInPage>
      ))}
    </ScrollContainer>
  );
}

const ScrollContainer = styled.div`
  transform: ${({ pageIndex }) => `translateY(-${pageIndex * 100}vh)`};
  /* transition: transform 0.5s ease; */
  height: calc(100vh - 10.25rem);
  margin-top: 10.25rem;
`;

const FadeInPage = styled.div`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? 'translateY(0)' : 'translateY(15px)'};
  transition: opacity 0.2s linear, transform 0.4s ease-in-out;
  height: calc(100vh - 10.25rem);
  margin-top: 10.25rem;
  width: 100%;
`;

const ScrollToTopContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 80px;
  z-index: 1;
`;

const ScrollToTopIcon = styled(ScrollUp)`
  width: 50px;
  height: 50px;
  color: ${props => props.theme.color.blue.brandColor6};
  cursor: pointer;
  transition: color 0.2s, opacity 0.2s, transform 0.3s;
  filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.269));
  &:active {
    transform: scale(0.9);
  }
  :hover {
    transform: scale(1.1);
    svg {
      filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.269));
    }
  }
`;
