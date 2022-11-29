import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
export const Container = styled.div``;
const clippath = keyframes`
  0%,
  100% {
    clip-path: inset(0 0 95% 0);
  }

  25% {
    clip-path: inset(0 95% 0 0);
  }
  50% {
    clip-path: inset(95% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 95%);
  }
`;
export const Left = styled.div`
  position: absolute;
  top: 6vh;
  // margin: 1vh;
  padding: 3px;
  width: 20vw;
  height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
`;
export const Right = styled.div`
  position: absolute;
  top: 6vh;
  right: 0;
  // margin: 1vh;
  padding: 3px;
  width: 20vw;
  height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
`;
export const Midd = styled.div`
  height: 100vh;
`;
export const Title = styled.div`
  height: 24px;
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BoxContainer = styled.div`
  height: calc(100% - 36px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export const BoxContainerItem = styled.div`
  width: 26%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  background: rgba(81, 99, 140, 0.4);
  :hover {
    background: rgba(81, 99, 140, 0.8);
  }
`;
