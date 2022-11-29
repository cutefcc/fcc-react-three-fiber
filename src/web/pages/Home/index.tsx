import { memo, useEffect, useRef, Suspense, useLayoutEffect } from 'react';
import { Mesh } from 'three';
import Header from '@components/Header';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Left, Right, Title, Midd, BoxContainer, BoxContainerItem } from './style';
import { useImmer } from '@hooks/useImmer';
const config = [
  {
    key: 3,
    text: '座舱仿真分系统',
  },
  {
    key: 4,
    text: '性能仿真分系统',
  },
  {
    key: 5,
    text: '航电仿真分系统',
  },
  {
    key: 6,
    text: '声音模拟分系统',
  },
  {
    key: 7,
    text: '发动机分系统',
  },
  {
    key: 8,
    text: '综合控制分系统',
  },
  {
    key: 9,
    text: '网络分系统',
  },
  {
    key: 10,
    text: '训练系统',
  },
];
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
  const LeftComponent = () => {
    return (
      <Left>
        <div className="relative" id="left">
          <Title>场景导航</Title>
          <BoxContainer className="w-full">
            {config.map((item, index) => {
              return (
                <div key={item.text} className="mr-5 rounded-[4px] mb-5">
                  <Button variant="contained">{item.text}</Button>
                </div>
              );
            })}
          </BoxContainer>
        </div>
      </Left>
    );
  };
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
                  <Button variant="contained">{item.text}</Button>
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
      <LeftComponent />
      <MiddleComponent />
      <RightComponent />
    </div>
  );
};
export default memo(Home);
