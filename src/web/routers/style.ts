import styled from '@emotion/styled';
export const color = 'hotpink';
export const bgColor = '#0f172a';
export const Nothing = styled.div`
  background: ${bgColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NothingText = styled.h2`
  & {
    color: #000;
    font-size: 80px;

    p {
      color: ${color} !important;
    }
  }
`;
