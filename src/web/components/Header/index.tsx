import { useImmer } from '@hooks/useImmer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopHeader, FullScreen } from './style';

interface Props {
  onFullScreen?: () => void;
  onExitFullScreen?: () => void;
  fr?: string;
}

const Header = (props: Props) => {
  const { onFullScreen = () => {}, onExitFullScreen = () => {}, fr = '' } = props;
  const navigate = useNavigate();
  const handleToHome = () => {
    navigate('/');
  };
  const getCurrTime = () => {
    return `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
  };
  const [time, setTime] = useImmer<string>(getCurrTime());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const handleFull = () => {
    const fullElement = document.fullscreenElement;
    if (!fullElement) {
      onFullScreen();
    } else {
      onExitFullScreen();
    }
  };

  return (
    <TopHeader className="h-[6vh] w-full absolute text-center z-10 leading-[6vh] bg-cover">
      <span className="text-[28px]">WZ8涡轴发动机工作原理教学系统</span>
      {/* <span className="text-[28px]" id="w28">
        WZ8
      </span> */}
      <div className="absolute right-80 top-0">{time}</div>
      {fr === 'flv' && (
        <div className="cursor-pointer" onClick={handleToHome}>
          返回 Home
        </div>
      )}
      {fr !== 'flv' && (
        <FullScreen
          className="absolute w-40 h-40 cursor-pointer right-20"
          onClick={handleFull}
        ></FullScreen>
      )}
    </TopHeader>
  );
};
export default Header;
