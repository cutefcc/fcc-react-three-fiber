import { useImmer } from '@hooks/useImmer';
import Button from '@mui/material/Button/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Left, Title, BoxContainer } from './style';

const config = [
  {
    key: 2,
    text: '首页',
    route: '/',
  },
  {
    key: 3,
    text: '座舱仿真分系统',
    route: '/cockpit',
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
    route: '/engine',
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
const LeftNav = () => {
  const navigate = useNavigate();
  const handleNav = item => () => {
    if (item.route) {
      navigate(item.route);
    }
  };
  return (
    <Left>
      <div className="relative" id="left">
        <Title>场景导航</Title>
        <BoxContainer className="w-full">
          {config.map((item, index) => {
            return (
              <div key={item.text} className="mr-5 rounded-[4px] mb-5">
                <Button
                  style={{ background: 'rgba(81, 99, 140, 0.4)' }}
                  variant="contained"
                  onClick={handleNav(item)}
                >
                  {item.text}
                </Button>
              </div>
            );
          })}
        </BoxContainer>
      </div>
    </Left>
  );
};
export default LeftNav;
