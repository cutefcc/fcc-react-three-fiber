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
  margin: 1vh;
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
  margin: 1vh;
  width: 20vw;
  height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
`;
export const Title = styled.div`
  height: 24px;
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SvgButton = styled.div`
  width: 18px;
  height: 18px;
  margin-left: 10px;
  background-image: url('/public/images/play.svg');
  background-size: 100%;
  cursor: pointer;
`;
// export const ButtonPause = styled.div`
//   background-image: url('/public/images/pause.svg');
// `;
export const BoxContainer = styled.div`
  height: calc(100% - 36px);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 10px;
  position: relative;
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
