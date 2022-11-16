import styled from '@emotion/styled';
export const TopHeader = styled.div`
  background-image: url(/public/images/head.png);
  height: 6vh;
  background-size: 100% 100%;
  color: rgba(255, 255, 255, 0.7);
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  line-height: 6vh;
  z-index: 10;
`;
export const FullScreen = styled.div`
  width: 40px;
  height: 40px;
  background-image: url('/public/images/entryFullScreen.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  cursor: pointer;
  top: calc(6vh / 2 - 20px);
  right: 20px;
  font-size: 14px;
`;
