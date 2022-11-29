import { memo, useEffect, useRef, Suspense, useLayoutEffect } from 'react';
import { Mesh } from 'three';
import Header from '@components/Header';
import LeftNav from '@components/LeftNav';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Right, Title, Midd, BoxContainer, BoxContainerItem } from './style';
import { useImmer } from '@hooks/useImmer';

const optConfig = [
  {
    key: 1,
    text: '新手引导',
  },
  {
    key: 2,
    text: '系统退出',
  },
];
const Home = (): JSX.Element => {
  const MiddleComponent = () => {
    return (
      <Midd className="bg-[#ccc] pt-[6vh]">
        <img className="block w-full h-full" src="/public/images/chinese_9.jpeg" alt="直9" />
      </Midd>
    );
  };
  const RightComponent = () => {
    return (
      <Right>
        <div className="relative" id="right">
          <Title>操作</Title>
          <BoxContainer className="w-full">
            {optConfig.map((item, index) => {
              return (
                <div key={item.text} className="rounded-[4px] mb-5">
                  <Button style={{ background: 'rgba(81, 99, 140, 0.4)' }} variant="contained">
                    {item.text}
                  </Button>
                </div>
              );
            })}
          </BoxContainer>
        </div>
      </Right>
    );
  };

  return (
    <div>
      <Header />
      <LeftNav />
      <MiddleComponent />
      <RightComponent />
    </div>
  );
};
export default memo(Home);
