import styled from '@emotion/styled';

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
export const BoxContainer = styled.div`
  height: calc(100% - 36px);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 10px;
  position: relative;
`;
